---
title: "10 Tips to Secure Your Apache Web Server on UNIX / Linux"
date: "2020-12-20"
category: "linux"
path: "/10-tips-to-secure-your-apache-web-server-on-unix-linux/"
published: true
tags: [shell-scripting,centos7,linux]
metadescription: "In this tutorial, I'll cover some main tips to secure your Apache web server which can help you to configure Apache web server on linu/unix"
cover: "images/tips-secure-apache-server-linux.png"
author: tom
article: true
---

## Introduction
If you are one of those Linux admins who works daily on Apache Web server or use it extensively , you should be probably aware of securing your apache web server .

Here are the list of steps you should follow 

## 1. Disable unnecessary modules
Once you install apache from source , there are variety of modules that apache has and you might not need all of them . Most of the time System Admins ignore this step .Some of the modules necessary are SSL & SO .

Let's check all the available modules 
```bash
./configure –help
```
This provides the list of modules , now you can enable and disable based on your requirement as shown below .

* Disable all of the above modules as shown below when you do ```./configure```
```bash
./configure \
--enable-ssl \
--enable-so \
--disable-autoindex \
--disable-userdir \
--disable-env \
--disable-setenvif
```

## 2. Run Apache as separate user and group
It is abest practice to run apache as a user For example: apache. in its own user group .We should not leave apache running as a daemon 

Create apache group and user.

```bash
groupadd apachegroup
useradd -d /usr/local/apache2/htdocs -g apachegroup -s /bin/false apache
```
Modify the httpd.conf, and set User and Group appropriately.

```bash
# vi httpd.conf
User apache
Group apachegroup
```
Now lets go ahead  restart apache . So execute the following command
```bash
$ ps -ef
```
User that you will see in the list is "apache" 

Note :- First apache process httpd will always run as a root


```shell
# ps -ef | grep -i http | awk '{print $1}'
```
Output :-
```text
root
apache
apache
apache
apache
apache
```

## 3. Restrict access to root directory (Use Allow and Deny)
Secure the root directory by setting the following in the httpd.conf
```shell
<Directory />
    Options None
    Order deny,allow
    Deny from all
</Directory>
```
In the above:

1. **Options None** – Set this to None, which will not enable any optional extra features.

2. **Order deny,allow** – Order of processing the directives are "order" "Deny" and "Allow" directivites .

3. **Deny from all** – This denies request from everybody to the root directory. There is no Allow directive for the root directory. So, nobody can access it.

## 4. Set appropriate permissions for conf and bin directory

bin and conf directory should be viewed only by authorized users. It is good idea to create a group, and add all users who are allowed to view/modify the apache configuration files to this group.

Let us call this group: apacheadmingrp

Create the group.
```shell
groupadd apacheadmingrp
```
Allow access to bin directory for this group.

```shell
chown -R root:apacheadmingrp /usr/local/apache2/bin
chmod -R 770 /usr/local/apache2/bin
```
Allow access to conf directory for this group.

```bash
chown -R root:apacheadmingrp /usr/local/apache2/conf
chmod -R 770 /usr/local/apache2/conf
```
Add appropriate members to this group. In this example, both ramesh and john are part of apacheadmingrp

```shell
# vi /etc/group
apacheadmingrp:x:1121:tom,john
```
## 5. Disable Directory Browsing
If you don’t do this, users will be able to see all the files (and directories) under your root (or any sub-directory).

For example, if you navigate to http://{your-domain}/image/ and if you don’t have an index.html inside image, you will find all the image files under a particular directory as shown and listed in the browser . 

 Now an user can click on any of the listed image file to view , then click on a sub-directory to see its content.

To disable directory browsing, you can either set the value of Options directive to "None" or "-Indexes:". A – in front of the option name will remove it from the current list of options enforced for that directory.


```html

<Directory />
  Options None
  Order allow,deny
  Allow from all
</Directory>

(or)

<Directory />
  Options -Indexes
  Order allow,deny
  Allow from all
</Directory>
```
## 6. Don’t allow .htaccess
There is a high risk that someone might overwrite the default apache settings in ```.htaccess``` is inside a specific sub directory under htdocs. 
In terms of security , it is a vulnerabilty that any attacker can use and change the configurations .


You must not allow users to use the .htaccess file and override apache directives. 

In order to prevent this, set ```“AllowOverride None”``` in the root directory.

```xml
<Directory />
  Options None
  AllowOverride None
  Order allow,deny
  Allow from all
</Directory>
```
## 7. Disable other Options

Following are the available values for Options directive:

1. Options All – All options are enabled (except MultiViews). If you don’t specify 2.2. Options directive, this is the default value.
3. Options ExecCGI – Execute CGI scripts (uses mod_cgi)
4. Options FollowSymLinks – If you have symbolic links in this directory, it will be  followed.
5. Options Includes – Allow server side includes (uses mod_include)
6. Options IncludesNOEXEC – Allow server side includes without the ability to execute a command or cgi.
7. Options Indexes – Disable directory listing
8. Options MultiViews – Allow content negotiated multiviews (uses mod_negotiation)
9. Options SymLinksIfOwnerMatch – Similar to FollowSymLinks. But, this will follow only when the owner is same between the link and the original directory to which it is linked.
10. Never specify ‘Options All’. Always specify one (or more) of the options mentioned above. 
You can combine multiple options in one line as shown below.
```shell
Options Includes FollowSymLinks
```
The + and – in front of an option value is helpful when you have nested direcotires, and would like to overwrite an option from the parent Directory directive.

In this example, for /site directory, it has both Includes and Indexes:

```xml
<Directory /site>
  Options Includes Indexes
  AllowOverride None
  Order allow,deny
  Allow from all
</Directory>
```
For /site/en directory, if you need Only Indexes from /site (And not the Includes), and if you want to FollowSymLinks only to this directory, do the following.

```xml
<Directory /site/en>
  Options -Includes +FollowSymLink
  AllowOverride None
  Order allow,deny
  Allow from all
</Directory>
```
* /site will have Includes and Indexes
* /site/en will have Indexes and FollowSymLink

## 8. Remove unwanted DSO modules

If you have loaded any dynamic shared object modules to the apache, they’ll be present inside the httpd.conf under “LoadModule” directive.

Please note that the statically compiled apache modules will not be listed as “LoadModule” directive.

Comment out any unwanted “LoadModules” in the httpd.conf
```shell
grep LoadModule /usr/local/apache2/conf/httpd.conf

```
## 9. Restrict access to a specific network (or ip-address)

If you want your site to be viewed only by a specific ip-address or network, do the following:

To allow a specific network to access your site, give the network address in the Allow directive.

```xml
<Directory /site>
  Options None
  AllowOverride None
  Order deny,allow
  Deny from all
  Allow from 10.14.0.0/24
</Directory>
```
To allow a specific ip-address to access your site, give the ip-address in the Allow directive.

```shell
<Directory /site>
  Options None
  AllowOverride None
  Order deny,allow
  Deny from all
  Allow from 10.10.1.21
</Directory>
```

## 10. Don’t display or send Apache version (Set ServerTokens)
By default, the server HTTP response header will contains apache and php version. Something similar to the following. This is harmful, as we don’t want an attacker to know about the specific version number.

```bash
Server: Apache/2.2.17 (Unix) PHP/5.3.5

```
To avoid this, set the ServerTokens to Prod in httpd.conf. This will display “Server: Apache” without any version information.

```bash
# vi httpd.conf
ServerTokens Prod
```
Following are possible ServerTokens values:

1. ServerTokens Prod displays “Server: Apache”
2. ServerTokens Major displays “Server: Apache/2″
3. ServerTokens Minor displays “Server: Apache/2.4″
4. ServerTokens Min displays “Server: Apache/2.4″
5. ServerTokens OS displays “Server: Apache/2.4 (Unix)”
6. ServerTokens Full displays “Server: Apache/2.4 (Unix) PHP/7.0″ (If you don’t specify any ServerTokens value, this is the default)

## Conclusion

Apart from all the above 10 tips, make sure to secure your UNIX / Linux operating system. There is no point in securing your apache, if your OS is not secure. Also, always keep your apache version upto date. The latest version of the apache contains fixes for all the known security issues. Make sure to review your apache log files frequently.
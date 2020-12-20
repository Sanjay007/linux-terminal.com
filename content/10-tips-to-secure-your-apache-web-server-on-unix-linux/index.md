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
---

## Introduction
If you are one of those Linux admins who works daily on Apache Web server or use it extensively , you should be probably aware of securing your apache web server .

Here are the list of steps you should follow
## 1. Disable unnecessary modules

If you are planning to install apache from source, you should disable the following modules. If you do ./configure –help, you’ll see all available modules that you can disable/enable.

* ```userdir``` – Mapping of requests to user-specific directories. i.e ~username in URL will get translated to a directory in the server
* ```autoindex``` – Displays directory listing when no index.html file is present
* ```status``` – Displays server stats
* ```env``` – Clearing/setting of ENV vars
* ```setenvif``` – Placing ENV vars on headers
* ```cgi``` – CGI scripts
* ```actions``` – Action triggering on requests
* ```negotiation``` – Content negotiation
* ```alias``` – Mapping of requests to different filesystem parts
* ```include``` – Server Side Includes
* ```filter``` – Smart filtering of request
* ```version``` – Handling version information in config files using IfVersion
as-is – as-is filetypes
* Disable all of the above modules as shown below when you do ```./configure```
```bash
./configure \
--enable-ssl \
--enable-so \
--disable-userdir \
--disable-autoindex \
--disable-status \
--disable-env \
--disable-setenvif \
--disable-cgi \
--disable-actions \
--disable-negotiation \
--disable-alias \
--disable-include \
--disable-filter \
--disable-version \
--disable-asis
```

If you enable ssl, and disable mod_setenv, you’ll get the following error.

* Error: Syntax error on line 223 of **/usr/local/apache2/conf/extra/httpd-ssl.conf: Invalid command ‘BrowserMatch’, perhaps misspelled or defined by a module not included in the server configuration**
* Solution: If you use ssl, don’t disable setenvif. Or, comment out the BrowserMatch in your httpd-ssl.conf, if you disable mod_setenvif.

After the installation, when you do httpd -l or apache2 -l, you’ll see all installed modules.
```bash
# /usr/local/apache2/bin/httpd -l
Compiled in modules:
  core.c
  mod_authn_file.c
  mod_authn_default.c
  mod_authz_host.c
  mod_authz_groupfile.c
  mod_authz_user.c
  mod_authz_default.c
  mod_auth_basic.c
  mod_log_config.c
  mod_ssl.c
  prefork.c
  http_core.c
  mod_mime.c
  mod_dir.c
  mod_so.c
  ```
  In this example, we have the following apache modules installed.

* core.c – Apache core module
* mod_auth* – For various authentication modules
* mod_log_config.c – Log client request. provides additional log flexibilities.
* mod_ssl.c – For SSL
* prefork.c – For MPM (Multi-Processing Module) module
* httpd_core.c – Apache core module
* mod_mime.c – For setting document MIME types
* mod_dir.c – For trailing slash redirect on directory paths. if you specify url/test/, it goes to url/test/index.html
* mod_so.c – For loading modules during start or restart

## 2. Run Apache as separate user and group
By default, apache might run as nobody or daemon. It is good to run apache in its own non-privileged account. For example: apache.

Create apache group and user.

```bash
groupadd apache
useradd -d /usr/local/apache2/htdocs -g apache -s /bin/false apache
```
Modify the httpd.conf, and set User and Group appropriately.

```bash
# vi httpd.conf
User apache
Group apache
```
After this, if you restart apache, and do ps -ef, you’ll see that the apache is running as “apache” (Except the 1st httpd process, which will always run as root).

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
2. **Order deny,allow** – This is the order in which the “Deny” and “Allow” directivites should be processed. This processes the “deny” first and “allow” next.
3. **Deny from all** – This denies request from everybody to the root directory. There is no Allow directive for the root directory. So, nobody can access it.

## 4. Set appropriate permissions for conf and bin directory
bin and conf directory should be viewed only by authorized users. It is good idea to create a group, and add all users who are allowed to view/modify the apache configuration files to this group.

Let us call this group: apacheadmin

Create the group.
```shell
groupadd apacheadmin
```
Allow access to bin directory for this group.

```shell
chown -R root:apacheadmin /usr/local/apache2/bin
chmod -R 770 /usr/local/apache2/bin
```
Allow access to conf directory for this group.

```bash
chown -R root:apacheadmin /usr/local/apache2/conf
chmod -R 770 /usr/local/apache2/conf
```
Add appropriate members to this group. In this example, both ramesh and john are part of apacheadmin

```shell
# vi /etc/group
apacheadmin:x:1121:tom,john
```
## 5. Disable Directory Browsing
If you don’t do this, users will be able to see all the files (and directories) under your root (or any sub-directory).

For example, if they go to http://{your-ip}/images/ and if you don’t have an index.html under images, they’ll see all the image files (and the sub-directories) listed in the browser (just like a ls -1 output). From here, they can click on the individual image file to view it, or click on a sub-directory to see its content.

To disable directory browsing, you can either set the value of Options directive to “None” or “-Indexes”. A – in front of the option name will remove it from the current list of options enforced for that directory.

Indexes will display a list of available files and sub-directories inside a directory in the browser (only when no index.html is present inside that folder). So, Indexes should not be allowed.

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

Using .htaccess file inside a specific sub-directory under the htdocs (or anywhere ouside), users can overwrite the default apache directives. On certain situations, this is not good, and should be avoided. You should disable this feature.

You should not allow users to use the .htaccess file and override apache directives. To do this, set “AllowOverride None” in the root directory.

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
3. ServerTokens Minor displays “Server: Apache/2.2″
4. ServerTokens Min displays “Server: Apache/2.2.17″
5. ServerTokens OS displays “Server: Apache/2.2.17 (Unix)”
6. ServerTokens Full displays “Server: Apache/2.2.17 (Unix) PHP/5.3.5″ (If you don’t specify any ServerTokens value, this is the default)

## Conclusion

Apart from all the above 10 tips, make sure to secure your UNIX / Linux operating system. There is no point in securing your apache, if your OS is not secure. Also, always keep your apache version upto date. The latest version of the apache contains fixes for all the known security issues. Make sure to review your apache log files frequently.
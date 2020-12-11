---
title: "Write Shell Script to Send Email Alert when too low Server memory "
date: "2020-12-12"
category: "linux"
path: "/mail-alert-shell-script-when-memory-ram-low"
published: true
tags: [shell-scripting,centos7,linux]
metadescription: "We will understand How can we send email alert when memory is too low in your linux systems.RAM is considered as one of the most important part of any system , especially when a system runs in production and you need to consistently monitor your RAM usage."
cover: "images/mail-alert.png"
author: tom
---

## Introduction

Almost all linux admin knows about bash and bash scripting is one of the most demand skills for any linux admin . So today we will understand How can we send email alert when memory is too low in your linux systems .

RAM is considered as one of the most important part of any system , especially when a system runs in production and you need to consistently monitor your RAM usage . 

We will be writing a shell script to monitor and alert around this special part of your linux server . I have mostly used Linux VPS and has been using it with Ram of **1GB** .


##Pre-Requisistes
A **CentOS/RHEL 7**  production server or a Linux VPS with **mailx** utility installed working on your server.

## Environment Setup
lets create a file `memoryticker.sh` using `vi` editor 
```bash
vi memoryticker.sh
```
Now we are going to use this `memorymailer.sh` to run and send mail alerts for our RAM usage .So the logic that we are going to write in this script is if memory usage is more than a particular limit let's say in our case **500MB** .
We are going to send an email alert with list of top 5 processess consuming high memory in our server . Lets follow the step below 

## 1.1 Find Free Memory Of your Linux  Server 
In order to find free memory of your linux server execute the following command . 

```shell
free -mt
```
This command below shows the total free available and total memory in your server as shown below .

```text
              total        used        free      shared  buff/cache   available
Mem:            991         214         543           6         232         634
Swap:           819           0         819
Total:         1811         214        1363
```
Now we want to extract the free memory available here and proceed with our calculation based on that .Here is how we do that 
```bash
free -mt | grep Total | awk '{print $4}'
```
This returns 1363 as output . Now next step is finding out what all processess consuming higher percentage of memory .

## 1.2 Find Process Consuming high amount of Memory 
we will now list down only top 5 processess consuming memory using ```ps``` command.
```bash
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem  | awk 'NR<=6'
```
We will get output as below which is list of processes consuming memory and cpu .

```yaml
  PID  PPID CMD                         %MEM %CPU
 1116     1 /usr/bin/dockerd -H fd:// -  7.0  0.1
 1115     1 /usr/bin/containerd          3.8  0.0
  713     1 /usr/bin/python2 -Es /usr/s  2.9  0.0
 1106     1 /usr/bin/python2 -Es /usr/s  1.7  0.0
```
Next step would be we will be storing this in a file and sending a mail alert .
## 1.3 Sending email 
We now will be sending email alert , here is the consolidated shell script which does the actual work of sending mail .Here is the consolidated script that does the hard work.

```shell
#!/bin/bash 
subject="Memory Alert"
from="admin@thelinuxterminal.com"
to="user1@gmail.com"

free=$(free -mt | grep Total | awk '{print $4}')

if [[ "$free" -le 100  ]]; then
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | awk 'NR<=5'
    | head >/tmp/memeorydata.txt

file=/tmp/memeorydata.txt

echo -e "Warning, server memory is running low!\n\n
    Free memory: $free MB" |

mailx -a "$file" -s "$subject" -r "$from" -c "$to"

fi
exit 0

```
We are getting the free memeory then calculationg if free memory is less than **100MB** . If its less than the thrashold we are finding out the top 5 processes consuming the memeory and storing that data in a file . 
We now use the ```mailx`` to send email to our email .Once you create and use the shell script make sure you make it executable . 
Once you make the script executable , you should set it as a cron JOB .

##Conclusion 
So , we have seen how we can create a shell script that sends an email alert , let us know if you have any concerns and comments on the tutorial.

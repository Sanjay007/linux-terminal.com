---
title: "Grep Command Examples in Unix/Linux Shell Scripting"
date: "2020-12-12"
category: "shell-scripting"
path: "/grep-command-examples-in-linux-shell-scripting/"
published: true
tags: [linux,shell-scripting]
metadescription: "Grep commands are widely used in text based operations linux shell scripting .Lets learn Grep Command Exmples in Unix/Linux Shell Scripting"
cover: "images/grep-command-example.png"
author: tom
article: true
---

## Introduction
For most of the developers and admin , manipulating something after reading a particular file is a common task that most of us hate to do .
Grep Command is mostly used in these cases to work with while searching in any kind of text.
Grep is Powerful text bases regular expression search utility present in most of linux falvours. 
In this article we will understand and learn few examples which we use in our shell scripts.


##Pre-Requisistes
A **CentOS/RHEL 7**  production server or a Linux VPS . 

## Installing Grep in Linux/Unix
In most of the cases grep is pre installed in most of the linux distros. But it is possible in some of the linux distros grep might not be present .
 Have a look how we can install grep .
 #### Installing grep in Ubuntu Distros
 ```bash
 sudo apt-get install grep
 ```

 In RedHat linux Distros yu can install by simply 
 ```bash
 yum install grep
 ```
 You can now verify the grep installation by simply typing 
 ```bash
 grep ---version
```
## Common Grep Command Examples in Linux 
The grep command is the one of the most commonly used  Unix utility for text based searching in files or any other types . It accepts regular expressions, and can produce output in various formats.  

Lets have a look athe various options available in grep command  using examples.

### How to Search for Lines with a specific pattern

```bash
$ grep pattern filename
```
Lets say i want to find a text name as ```John``` in my text file

```bash
grep "John" terminal.txt
```
This would list down all the lines with the word "John" in my text fle.You can also search in multiple files using the same patttern above 

```bash
grep "John" file1.txt file2.xt file3.txt 
```




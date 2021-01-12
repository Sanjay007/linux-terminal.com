---
title: "Best 15 Linux Tips and Tricks for Developers  "
date: "2021-01-12"
category: "unix"
path: "/15-unix-tricks/"
published: true
tags: [unix,nlinux]
metadescription: "Here are top 15 unix tricks useful in everyday . These 15 unix tricks will make you productive and effective"
cover: "images/15-unix-tips-tricks.png"
author: tom
article: true
---

## Introduction
We use unix almost on most of the production servers in IT world . Wheather Cetos7 or Redhat or any other falvours of linux.Unix command line has varities of options which makes our life easier .Here are the 15 tricks i use to make things quick for me . Lets share the secrets .

## Display Last Word in File 
If you want to display last word of every line of a file then one of the best way to use is ```$NF``` with awk command . Have  alook at how we can do that . I was using awak for almost every purpose.

```bash
sudo awk '{print $NF}
```
```bash
sudo awk -F: '{print $NF}
```
Now lets take an example where i have a file ```names.txt``` with following text 
```text
John Adam Bob Archer
Ricky Cornell Aish Annie
```
Now in order to get the result as ```archer and annie``` i will execute the below command .
```bash
 cat file.txt |awk   '{print $NF}'
 ```
 Output:-
 ```text
 Archer
 Annie
 ```
If you want to select next to last field then use ```NF-1``` .

```bash
cat file.txt |awk   '{print $(NF-1) }'
```
Output:
```text
Bob
Alish
```
## Remove the Nth line from All the lines 
In order to remove a particular line from a line is a stuff that sed command handles easily .

Lets say we have a file with 12 lines and we want to remove few lines and i want 10th line to be skipped .
You can use the Sed command in thi case as below .


```bash
$ sed -i '10 d' file.txt      
```
## How to Remove Blank Lines from File
There are multiple  ways to remove blank lines from a file. One of the most common  is to use sed. 
In case of sed command , we use ^$ to represent a blank line , where  ^ represents the start of a line and $ represents the end of the  line.
So how blank is treated in unix coomand ? 
If a line with a start and an end with no text  between is treated as  blank .

lets consider the below line in a text file as below
```text
first line

third line
```
Now we will use the command below to remove the empty lines in the text file.
```bash
$  sed -i /^$/d file.txt
```

A grep command, similar to  sed commands shown above, also uses the ^$ to select blanks lines and the -v to select anything BUT these lines. This command then displays the text without the blank lines but doesn’t change the original file.

```bash
grep -v ‘^$’ file.txt
```

One of the alternative is using awk command . This command will also display the text and ignore the blank lines . But unlike grep command , it won’t change the original file. 

***Why this ?***

It is  because $0 has all of the words on the line . What if you want to store the output ?
We should redirect the output and store it in a new file.

## How to replace all instances of a word with another word
For this kind of , I will use a simple command like this below .

```bash
$ sed s/Adam/Arep/g file.txt
```
That will  work gret but it will change occurences of "Adam" to "Arep" irrespective of it apears in words or lines or in a part of words .This gets really complex with sed command .

 Here’s an example below . It uses the \b (word boundary) marker to ensure we only change “adam” to “arep” and alos makes sure it’s an entire word.

```bash
$ $ sed -e ‘s/\badam\b/arep/g’ file.txt
```

But If you want the change to be case insensitive yopu can add ```!```  ignore case option in your sed command as below .

```bash
$ $ sed -e ‘s/\bAdam\b/Arep/g!’ file.txt
```

**Note:-**
The SED command ```-i``` option actually changes the original content of the file , so be cautious while using it .

## Count how many times a word appears in  file
In order to count number of occurences of a word in a file , basically i am specific to log files is using grep command .
I use grep command to find the number of occurences of a word as below .

```bash
$grep -c 'test' file.txt
```
it returns the count of occurences of the word ```test``` in any log file or text .

## How to reverse string in Shell Script
If you want to reverse a string from console , just use ```rev``` command . This will reverse any string .

```bash
echo "lanimretxunileht" | rev
```
this will return the output as
```thelinuxterminal``` .
Alternatively ```rev``` command can be directly used as below.

```bash
$ rev lanimretxunileht
```

## Find architecture (32 or 64 bit) of your system
This one’s pretty  easy. Use the ```arch``` command and we can get the system architecture details in unix or linux distros.

```bash
$ arch

i386

```

## Make variables available to subshell
In order to make variables available to a subshell you should define the variable globally in your partent shell.

create a shell script to print the variable

```bash
//script.sh
#!/bin/bash
echo $price
```

```bash
$ price=”12.0”
```
In the above code we are just setting the value tto the variable , now we will ryun and try to acess it wont get accessed below .

```bash
$ ./script
$ export  $price
```
As it wont get accessed we are now exporting the variable , now we will be able to acess the variable from any subshell.


## Find What Process is Using a File 
The lsof command was nothing short of an amazing when I came around it ten years or so ago. LSOF stands for for"list open files", the lsof command comes in extremely handy once you want information regarding your devices  or to learn what a specific user is getting at some point in time.

Have a look at [lsof manual page](https://man7.org/linux/man-pages/man8/lsof.8.html)

```bash
$ lsof more
```
If you want to find out what all processess are using  a file 

```bash
$ lsof /bin/bash
```
If you want to get the count of open files open by a particular process and a particular user  use lsof command with grep and wc parameter .
```bash
$ lsof | grep root | wc -l
```
This will list down all open files opened by a particular user in your server , one of the most important linux tips while debugging unwanted performance issuess on your server.

Assume you are aware that a process is taking load and want to list all the network files and sockets opened by that process then use the below command to accomplish that.

```bash
$ lsof -i -a -p <PID>
```
Replace the <PID> with your process id.

## Find Network  and Network Interface Load
The best solution will install a tool which does this for you. One thing you can do is look at the output of the ifconfig command. Along with all the addressing information, you are going to find some stats that tell you how many packets have been received and sent. That will provide you some idea how busy the port continues to be.
```bash
$ifcfg -a
```
Output:-

```text
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 95.111.242.12  netmask 255.255.240.0  broadcast 95.111.255.255
        ether 00:50:56:40:8c:99  txqueuelen 1000  (Ethernet)
        RX packets 546052993  bytes 1253764871488 (1.1 TiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 468515269  bytes 443271432103 (412.8 GiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 137380783  bytes 1305217368261 (1.1 TiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 137380783  bytes 1305217368261 (1.1 TiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

## Conclusion 
We have listed down few most common tips and tricks that is used by me as a developer .
Please let me know your frequently used tricks , so that it can help the community 
Cheers !!!

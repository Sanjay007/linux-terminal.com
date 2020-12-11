---
title: "How to Install Nginx On Centos7 "
date: "2020-12-12"
category: "centos"
path: "/how-to-install-nginx-on-centos7"
published: true
tags: [centos7,nginx]
metadescription: "We will understand How can we send email alert when memory is too low in your linux systems.RAM is considered as one of the most important part of any system , especially when a system runs in production and you need to consistently monitor your RAM usage."
cover: "images/install-nginx-centos.png"
author: tom
---

## Introduction

What is Nginx ?
In case you haven't heard about Nginx , think it as a Load Balancer initially , but i tell you it is more than that .
Nginx is a high perforant load balancer and reverse proxy , it can handle much more no of http concurrent requests than Apache .

Nginx can also act as a standalone web server and it is one of the most commonly used multipurpose tool loved by system adfmins .It is extremely popular in handling high traffic due to its event loop architecture . Nginx can handle 10,000 concurrent requests .

In this article we will learn  how to install  Nginx on your CentOS 7 server or machine.


##Pre-Requisistes
A **CentOS/RHEL 7**  production server or a Linux VPS . Make sure you do not have **Port 80** & **PORT 8443** occupied .

## Setup Nginx Repository in Centos 7
In order to setup nginx repository we need to add **Centos7 EPEL** repository.
```bash
sudo yum install epel-release
```
you can also setup in a different way below manually.

## Setup Nginx Repo Manually On Centos7/RHEL

In order to setup manually you can login with root user or any user with which you want your nginx to run .
Create a file ```nginx.repo``` in following directory .

```bash
$ vi /etc/yum.repos.d/nginx.repo
```

## Installing Nginx On Centos7
Once we have the repository added we can now install nginx using below command
```bash
sudo yum install nginx

```
Nginx will now get installed on your VPS or Server . Next step is 

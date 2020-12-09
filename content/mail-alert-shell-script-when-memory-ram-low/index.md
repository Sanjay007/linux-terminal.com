---
title: "Write Shell Script to Send Email Alert whem too low memory"
date: "2020-12-12"
category: "linux"
path: "/mail-alert-shell-script-when-memory-ram-low"
published: true
tags: [shell-scripting]
metadescription: "Almost all linux admin knows about bash and bash scripting is one of the most demand skills for any linux admin . So today we will understand How can we send email alert when memory is too low in your linux systems .

RAM is considered as one of the most important part of any system , especially when a system runs in production and you need to consistently monitor your RAM usage . 

We will be writing a shell script to monitor and alert around this special part of your linux server . I have mostly used Linux VPS and has been using it with Ram of **1GB** .
"
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


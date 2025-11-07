---
title: Host/Name
slug: host-name
description: In which our hero places the blog somewhere and gives it a comprehensible address...
date: '2025-11-07'
---

## Host

My intention with this project is to use it as a way to explore different technologies and different aspects of technology. One crucial part of any software project is deployment - an app isn't worth much if it isn't accessible. To this end I need somewhere to host the project. Like everything else in software development, choice abounds, but for now, I want to start small and simple, whilst remaining cognisant of the broader goal of serving multiple applications. 

When I started this project, I figured a blog would be a good first application - it's small in scope, and can be served statically - thus requiring no backend - and documenting my process, gives me some content. I'm including this note because when looking at hosting options, if I was only concerned with hosting a blog, there are other, cheaper, better options - Cloudfare Pages seems to have a free tier that would be perfect - and perhaps I will eventually migrate the blog to such a service. However, since I intend on serving multiple applications, I've instead opted to pay for a Virtual Private Server (VPS). Since I'm unfamiliar with what my resource requirements are and will be, I've opted for the cheapest VPS Hetzner provides .

- USD 3.84 a month
- 2 VCPU
- 4 GB RAM
- 40 GB Disk
- Ubuntu
- 20 TB of outbound traffic
- Hosted in Nuremberg


## Name

Hetzner provides you with an IPv4 address for your server and SSH access and that's about it. To actually find the server it helps to have a friendly name to reach it at, and that means purchasing a domain name. Domain names are naturally unique, so it's a bit of a game, trying to find one suitable, and cost-effective. I found [this site](https://tld-list.com) to be quite helpful in aggregating both information and providers. Adblock didn't like links off of the site, so, I just googled the providers' sites directly. 

I wanted something to do with my name so looked at Top Level Domains (TLDs) that used part of my name. `.den`, and `.en` don't exist. Use of `.mil` is restricted to the US Military and `.il` requires some affiliation with Israel. 

So I chose `.ml` because the phonetic pronunciation of 'M' and 'L' is close enough to how I pronounce 'Emil'. Close *enough*. `.ml` is the TLD assigned to the country of Mali, who do not have affiliation requirements for use of the domain.

I purchased `kloeden.ml` from DynaDot because they had the best price. It wasn't the cheapest purchase, but 3 years cost approx AUD 50.

## Host+Name

With the domain name purchased and the server running, I needed to connect one to the other. This was done in DynaDot's console. I created two 'A' DNS records `kloeden.ml` and `blog.kloeden.ml` and entered the IP address against both.  Currently both are serving the same content, but this enables me to switch `kloeden.ml` over to something else quickly, just by changing Nginx configuration.

So that's it, a server up and addressable by name. I neglected to document the process of deploying the application to the server here. Perhaps next time.
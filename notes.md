# Notes
## Requirements
#### System
OS: N/A
RAM: N/A
CPU: N/A
#### Applications
node
#### Global Packages
pm2

##### Usage
    pm2 start <file>

    Options:
        --name <name>

        --watch

        --max-memory-restart <200MB>

        --log <path>

        -- arg1 arg2 arg3

        --restart-delay <delayMS>

        --time

        --no-auto-restart



## Webserver
#### Functionalty
Should work for most of the server, mainly static webpages (maybe change to react or eqiv at somepoint for more important pages which require rendering)

Should also be able to be easily launched, halted and should not be reliant on any other systems which could fail.

Build to make sure it uses the least amount of system resources as possible.

Make sure that everything that does not need to be shown or given to the client is not sent to the client (limited JS files, make sure to make it so that it's not injectable, etc)

Should be easy to update and should not use any depreciated packages or systems.

#### Pages
./sitemap.md


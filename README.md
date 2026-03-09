# Contributing
## OpenApi
This repository uses Openapi descriptions as the source of truth or contract between the web-app and REST API. 
Good read: [https://learn.openapis.org/best-practices.html](https://learn.openapis.org/best-practices.html)

## React
Most of this project is a react SPA application. The react code is written in Typescript and is build on Tanstack libraries.
The project structure loosely follows Bulletproof React.
Good read: [https://github.com/alan2207/bulletproof-react](https://github.com/alan2207/bulletproof-react)
It has not been super strictly followed. The main takeaway is put generic code in the top-level `components` or `hooks` directories.
Put feature-specific code in `features` sub-directories. Try not to cross-contaiminate feature code, can you break the re-usable part out and put it into `components`?

FastAPI is a modern, fast (high-performance), web framework for building APIs with Python based on standard Python type hints.

The key features are:

Fast: Very high performance, on par with NodeJS and Go (thanks to Starlette and Pydantic). One of the fastest Python frameworks available.
Fast to code: Increase the speed to develop features by about 200% to 300%. *
Fewer bugs: Reduce about 40% of human (developer) induced errors. *
Intuitive: Great editor support. Completion everywhere. Less time debugging.
Easy: Designed to be easy to use and learn. Less time reading docs.
Short: Minimize code duplication. Multiple features from each parameter declaration. Fewer bugs.
Robust: Get production-ready code. With automatic interactive documentation.
Standards-based: Based on (and fully compatible with) the open standards for APIs: OpenAPI (previously known as Swagger) and JSON Schema.


Meet Django
Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel. It’s free and open source.

Ridiculously fast.
Django was designed to help developers take applications from concept to completion as quickly as possible.

Reassuringly secure.
Django takes security seriously and helps developers avoid many common security mistakes.

Exceedingly scalable.
Some of the busiest sites on the web leverage Django’s ability to quickly and flexibly scale.


Welcome to Flask’s documentation. Get started with Installation and then get an overview with the Quickstart. There is also a more detailed Tutorial that shows how to create a small but complete application with Flask. Common patterns are described in the Patterns for Flask section. The rest of the docs describe each component of Flask in detail, with a full reference in the API section.

Flask depends on the Werkzeug WSGI toolkit, the Jinja template engine, and the Click CLI toolkit. Be sure to check their documentation as well as Flask’s when looking for information.

User’s Guide
Flask provides configuration and conventions, with sensible defaults, to get started. This section of the documentation explains the different parts of the Flask framework and how they can be used, customized, and extended. Beyond Flask itself, look for community-maintained extensions to add even more functionality.

Installation
Python Version
Dependencies
Virtual environments
Install Flask
Quickstart
A Minimal Application
Debug Mode
HTML Escaping
Routing
Static Files
Rendering Templates
Accessing Request Data
Redirects and Errors
About Responses
Sessions
Message Flashing
Logging
Hooking in WSGI Middleware
Using Flask Extensions
Deploying to a Web Server
Tutorial
Project Layout
Application Setup
Define and Access the Database
Blueprints and Views
Templates
Static Files
Blog Blueprint
Make the Project Installable
Test Coverage
Deploy to Production
Keep Developing!
Templates
Jinja Setup
Standard Context
Controlling Autoescaping
Registering Filters
Context Processors
Streaming
Testing Flask Applications
Identifying Tests
Fixtures
Sending Requests with the Test Client
Following Redirects
Accessing and Modifying the Session
Running Commands with the CLI Runner
Tests that depend on an Active Context
Handling Application Errors
Error Logging Tools
Error Handlers
Custom Error Pages
Blueprint Error Handlers
Returning API Errors as JSON
Logging
Debugging
Debugging Application Errors
In Production
The Built-In Debugger
External Debuggers
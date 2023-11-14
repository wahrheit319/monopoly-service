# CS 262 Monopoly Webservice

This is the data service application for the 
[CS 262 sample Monopoly project](https://github.com/calvin-cs262-organization/monopoly-project),

Forked Service Repo https://github.com/wahrheit319/monopoly-service
 which is deployed here:
          
- <https://yl77hw03.azurewebsites.net>
- <https://yl77hw03.azurewebsites.net/players>
- <https://yl77hw03.azurewebsites.net/players/1>

It has the following read data route URLs:
- `/` a hello message
- `/players` a list of players
- `/players/:id` a single player with the given ID

It is based on the standard Azure App Service tutorial for Node.js.

- <https://learn.microsoft.com/en-us/azure/app-service/quickstart-nodejs?tabs=linux&pivots=development-environment-cli>  

The database is relational with the schema specified in the `sql/` sub-directory
and is hosted on [ElephantSQL](https://www.elephantsql.com/). The database server,
user and password are stored as Azure application settings so that they aren&rsquo;t 
exposed in this (public) repo.

We implement this sample service as a separate repo to simplify Azure integration;
it&rsquo;s easier to auto-deploy a separate repo to Azure. For your team project&rsquo;s 
data service, configure your Azure App Service to auto-deploy from the master/main branch 
of your service repo. See the settings for this in the &ldquo;Deployment Center&rdquo; 
on your Azure service dashboard.
 
### Questions and Answers

**1. What are the (active) URLs for your data service?**

The active URLs for the data service are:
- `https://yl77hw03.azurewebsites.net/` - A root URL returning a hello message.
- `https://yl77hw03.azurewebsites.net/players` - Returns a list of players.
- `https://yl77hw03.azurewebsites.net/players/:id` - Returns a single player based on their ID.

**2. Which of these endpoints implement actions that are idempotent? Nullipotent?**

- Idempotent: The `/players` and `/players/:id` endpoints are idempotent. They return the same result without changing the server's state, regardless of how many times they are called.
- Nullipotent: The root endpoint (`/`) is nullipotent as it simply returns a greeting message and does not affect the server state.

**3. Is the service RESTful? If so, what key features make it RESTful?**

Yes, the service is RESTful. Key features include:
- Stateless interactions: Each request contains all necessary information independently.
- Uniform Interface: Consistent and standardized methods to access and manipulate resources.
- Client-Server Architecture: Separation of concerns, allowing the client and server to evolve separately.

**4. Is there any evidence in your implementation of an impedance mismatch?**

No significant evidence of impedance mismatch is noted. The service effectively manages the relationship between the relational database model and the RESTful service architecture.

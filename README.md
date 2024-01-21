# Lets build a Client Management API using GraphQL

- `npm install`
- `npm run dev`

```
// get clients
{
  clients {
    id
    name
    email
    phone
  }
}

// create client
mutation {
  createClient(name: "Client 101", email: "client101@gmail.com", phone: "0212345566") {
    id
    name
    email
    phone
  }
}

// delete client
mutation {
  deleteClient(id: "65acb05807436fa51ec1dfbe") {
    id
    name
    email
    phone
  }
}

// get projects with related client
{
  projects {
    name
    status
    client {
      name
      email
    }
  }
}

// create project
mutation {
  createProject(name: "Website", description: "This is a cool project", status: new, clientId: "65acb0d607436fa51ec1dfc0") {
    id
    name
    description
    status
  }
}
```

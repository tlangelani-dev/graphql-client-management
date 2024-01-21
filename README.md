# Lets build a Client Management API using GraphQL

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
```

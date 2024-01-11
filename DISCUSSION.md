# DISCUSSION

The purpose of this file is to develop the reasoning over the technical choices made during the development
on this project

## Tech stack

The goal being to demonstrate coding ability in NodeJS, the language has to be [Typescript](https://www.typescriptlang.org/).
**There is no good reason to not use a typechecker when you can**

As an **open source** *object-relational* database, [PosgreSQL](https://www.postgresql.org/) is my de facto db for most project (unless specific needs), and is suited for this task. Also happened to be the one use by the recruiting company.

With my quasi nonexistent experience with backend dev in typescript, I went and learned the framework used by the recruiting company [NestJS](https://nestjs.com/).

## Object Model

The [TASK](TASK.md), describes two entities :

- Client (**`email`, `language`, `countryOfOrigin`, `countryOfDestination`**)
- Travel (**`travelDateStart`**, **`travelDateEnd`**)

In a real project, it would make sense to me to make two tables
with a many-to-many relationship.
Indeed, it's reasonable to assume that a client participates in several travels and, that several clients goes on the same travel.\
Given those assumptions, having two tables with many-to-many relationships will save data storage (thus cost) but will cost more processing when joining tables, and more complexity to handle in development

Then, taking into account the GWR partners that send the clients,
it is unclear if a specific travel could be advertised by different partner and/or a same client can go through different partners.\
Even if this was the case, given the information given, it makes more sense to me to consider clients and travels as separate entries if they came from different partners.

In the scope of the task (sending a personalized email ahead of their trip). The db schema that is the most appropriate, with the previous consideration would be the following :

### Database

***Table CLIENT***

|@pk email | language | countryOfOrigin | countryOfDestination | travelDateStart | travelDateEnd | originPartners|
|---:|---:|---:|---:|---:|---:|---:|
|string|string|string|string|date|date|string|

Compare to the first proposal, it is less future-proof, but it is enough to handle the only feature needed in the task.
I took the liberty of adding and `originPartners` field which is an information we get from authenticating the partners who send the data and, in my opinion should be present in the CRM, and fits well with the task of customizing the user experience by customizing the email based on the partners the client interacted with.

## API Endpoint

As per instructed, we will make a `POST` endpoint to receive client data.

The location will be `/client` and the data will contain all the field in the client table (except originPartners)

```json
{
  email : string ;
  language : string ;
  countryOfOrigin : string ;
  countryOfDestination : string ;
  travelDateStart : string ;
  travelDateEnd : string ;
}
```

We can also add a `GET` endpoint to list all client, but for security reason, we don't want information from one partner to another.\
This endpoint should be only available by GWR, or filter the database to only access those added by the partner who calls the endpoint

## Security Mechanism

### Authentication

In my honest opinion, the best security primitive for authentication is asymmetric cryptography. Which can be implemented through SSH, Certificate, PGP.\
Now, the issues with this approach is that most people are not familiar with it, and it's not very scalable.
With time, you can develop a plugin for the partners CMG that will handle that for him, but that's out of the scope of this task.

We will resort to a more known authentication process, user/password.

Now that implies a few changes to the database and the API.

For we will add a table to register partners data

***Table Partner***

| @pk id | name | password |
|---|---|---|
| int | string | hash |

***New Endpoint***

`POST`, `/auth/login`, `{ name : string, password : string }`, return `Bearer token`

### Authorization

We simply use a JWT Bearer token

### HTTPS

Of course, we want to redirect all traffic to HTTPS, to avoid man-in-the-middle attack and information leaks

I don't want to go through creating a certificate for this project, so I didn't set up HTTPS but to do so, just
uncomment the line in main.ts and fill the pass to your certificate

Same way, SSL should be set up for db connection in Production.

## Testing

You can find unit testing for each module and an e2e test for the app functionalities

The unit test for app, clients and partners modules are boilers plates do to app not really doing anything and partners and clients being only connection to the database.

Alternatively, one can use the docker db and the generated swagger service to perform manual testing.

One may want to remove token time limit to make manual testing more convenient

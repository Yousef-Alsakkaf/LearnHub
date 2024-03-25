import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";
import { ServerCommandBuilder } from "../../Applications/Commands/Builder.js";
import { UserAccessLevels, CommandExecuteArguments } from "../../Applications/Commands/Context.js";
import jsonwebtoken from "jsonwebtoken";
const key = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCHMyEiAGReu1UL
9/pLgE6pOuHweiDBEIx9fvp9PcL2kT9JTa9DaF6cW4gSYd7kRao7VauEb4N9N8/3
fwAZ1EHdBgr7z3BrUsfrwMI52MxwunP5Xj4XEH6IOG9yXjvSSIji38a9sHS5rhKF
5Drhgh4l8H6wkEhNQ+YXsq2Yq0uEPTLYFFwWY+JWZzC0ncxBGYZTPIqD0Q9FBzAO
6GcqI2JjnZbgFSnf6MGYKYAKtQ0gQOLsMUxy0KJ1g7zn/GsQboSojUYgDzBWgwf0
VdgIHA6d49/EhGIoH9qQtoSGy3BvWbBFkcpaOs25sGSCmCbfg/xVec/Xv6xpvXLr
LPhdl5WPAgMBAAECggEAAvAJeEOp6qUHZAsvVRSkoOi2oBMHQyqo4tEvgCknY1Qk
m+MkO8K4y4zxl/Socy1QVZm28Fm78ayUyDvqNKV4COVot6/6MVrLHURC9B7R0mE6
w+BYWQfyt+MCCOojQp5w2v0hxF1hK+esX1xmKyA4p3piRlPcPlGLXlhzjS2rpmPl
52XLob7IVaBCKUdXAk74Mc5hjspGNAOpQ0YV/+VXwbfVXRxewzprr+c67YnLrs4g
GHF0a4loGOZ6m3fwrp+EhL1M46bzwKMAX+1gmT6icSS7w5iap43rzIoVsTFl0SXf
1aODfH35qyzvnEUCtQ6boaxZGZdRP9xQBHvuV5MNgQKBgQDNEdMz7UvJLXNP6gd5
wEY0LKft14/sBQz8Dn6AZmPGmKiq3yVlAkpFL0mo1deGuu9IOT8HRrbGmr7oF6l7
E/rYUPdV/OAKIXGdZ9IjIL/fX3wURl+XB+dSR3FuZjWYpJBLi2cakMijDD7fRjgz
q8xuK6ifiWj7ynupTt08LWuPvQKBgQCoxwcVi+VjJ2hpJOyQDLHK0fuOzKTqB41j
p1y6iw7Fq2PUGoM1HiAegjzQmLC4n/XBya3M53VAHS6gsDm96Ef2XQLy17UCU36J
qa7CGGWW1ZCe2WdD6AcH2AhH4AejjygjYGVzYaH1QdRBbHFkcsLv6RoJ2FS9trTd
minVchQZOwKBgBDXM+cBx8V/rAaWC4MeHSXPvQK1PyZ8y7IvZogY4HzAsKlHpgSD
iaHg3kW1OfvggiIGQXzRe9UXhDH/L3XiECmPjKBNIgDy+ieZDRLBb8BiUQhBNzxp
8784CsKsNh6Q9SCfFBqEZVWufcNMOvVTWHh7sV9Yo3x6BmnDBjwY5sppAoGAEN7s
N1wnjtTGnBQDzZZnQ0XgJnMQXRBqMrbtDvyNenbaYL5RtUKQpVwRZiyNJbdfooJd
bCkK0GDaY1eaPgB1CQxdGhcz0cq00F/0xxQXO4+XiDllGCWeZktS8JRVTyUlNvwQ
yArPXKu64ttLLmZGVCLx5mAIgHo99BTP77UaizcCgYEAudC273CN2+sw9XJsLK6T
79zK9LJ7YFvFmaKVeGKBlO1eCv0+CzOL8go/mf1WXlyZRBb0Hbc8d+/RzA3FOYZk
eONBP54R5ntIkjIlxNyyzmJeIU5h+10smJBAY92Zy8ktNbonnnWT/qL9HgaIsGik
TtoXtZJXqZNc1GV8oM1ZQzM=
-----END PRIVATE KEY-----
`

const command = new ServerCommandBuilder("get-jwt")
  .setAccessLevel(UserAccessLevels.STUDENT)
  .setOutgoingChannel("get-jwt-response")
  .setIncomingValidationSchema({
    type: "object",
    additionalProperties: false,
    properties: {},
  })
  .setExecute(callback)
  .setOutgoingValidationSchema({})
  .build();

async function callback({ Client, Data, Database }: CommandExecuteArguments) {
  const id = Client.getId();

  const existingToken = await Database.executeQuery("SELECT * FROM JWT WHERE userid=?", [id]);

  if (existingToken[0]?.JWT == null) {
    let user = await Database.executeQuery("SELECT * FROM users WHERE id=?", [id]);
    user = user[0];
    const token = jsonwebtoken.sign(
      {
        id: user["UID"], // You can generate your own id and replace uuid()
        name: user["username"], // Set the user name
        email: user["email"], // Set the user email
        avatar: user["image"], // Set the user avatar
        appId: "vpaas-magic-cookie-c5fe3f41ced041b2a410174bffd4a537", // Your AppID
        kid: "vpaas-magic-cookie-c5fe3f41ced041b2a410174bffd4a537/ed7f8e", // Set the api key, see https://jaas.8x8.vc/#/apikeys for more info.
      },
      key,
      { algorithm: "RS256" }
    );

    await Database.executeQuery("INSERT INTO JWT (userid,JWT) VALUES(?,?)", [id, token]);
    return token;
  } else return existingToken[0].JWT;
}

export default command;

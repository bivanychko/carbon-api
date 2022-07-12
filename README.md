![Agreena](https://agreena.com/wp-content/uploads/2021/06/agreena-logo.svg)

# NodeJS recruitment test task

### Carbon Certificates application API
Create the API containing endpoints:
1. Login
2. List of available Carbon certificates (*no owner*)
3. List of owned Carbon certificates (*owned by current user*)
4. Transfer my own Carbon certificate to the another existing user (*based on the User ID parameter*)

##### Data informations
**Carbon certificate** should contain the following data:
- Unique ID
- Country
- Status:
  - `available` (*no owner*)
  - `owned` (*owner is present and certificate hasn't been transferred*)
  - `transferred` (*owner is present and certificate has been transferred from one owner to another*)
- Owner (*relation to existing user, can be empty*)

##### Requirements
- Application should be written with strong typing (*TypeScript*)
- Framework is free of choice
- Authentication should be implemented (*type/package if free of choice*)
- Seeds should be included (*100 random certificates, 5 random users with certificates and 5 without them*)
- Tests have to be included

### Good luck!

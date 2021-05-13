const request =  require("request");

var BASE_CONTACT_API_PATH = "/api/v1";

var contacts = [
    {
        "name": "pablo",
        "phone": 12345
    },
    {
        "name": "pepe",
        "phone": 6789
    }
];

module.exports = (app) => {

    app.get(BASE_CONTACT_API_PATH+"/contacts", (req,res)=>{
        res.send(JSON.stringify(contacts,null,2));
     });
    
    app.post(BASE_CONTACT_API_PATH+"/contacts", (req,res)=>{
        var newContact = req.body;
        
        console.log(`new contact to be added: <${JSON.stringify(newContact,null,2)}>`);
    
        contacts.push(newContact);
    
        res.sendStatus(201);
     });

     app.delete(BASE_CONTACT_API_PATH+"/contacts/:contactName", (req,res)=>{
        var contactName = req.params.contactName;

        console.log(`contact to be deleted: <${contactName}>`);

        contacts = contacts.filter( (c)=>{
            return (c.name != contactName);
        });
    
        res.sendStatus(200);
     });


     app.get(BASE_CONTACT_API_PATH+"/contacts/:contactName", (req,res)=>{
        var contactName = req.params.contactName;

        console.log(`contact to be obtained: <${contactName}>`);

        var filteredContacts = contacts.filter( (c)=>{
            return (c.name == contactName);
        });
    
        if(filteredContacts.length > 0)
            res.send(JSON.stringify(filteredContacts[0],null,2));
        else
        res.sendStatus(404);
     });


     app.put(BASE_CONTACT_API_PATH+"/contacts/:contactName", (req,res)=>{
        var contactName = req.params.contactName;
        var updatedContact = req.body;

        console.log(`contact to be updated: <${contactName}>`);

        contacts = contacts.map( (c)=>{
                if (c.name == contactName)
                    c.phone = updatedContact.phone;
                    
                return c;
        });
    
        res.sendStatus(200);
     });



     app.use("/proxyHeroku", function(req, res) {
        console.log(`New Proxy Call!`);

        var apiServerHost = 'https://sos2021-l12.herokuapp.com';
        console.log(`apiServerHost = <${apiServerHost}>`);
        console.log(`baseURL = <${req.baseUrl}>`);
        console.log(`url = <${req.url}>`);
       
        var url = apiServerHost + req.url;

        console.log(`piped: ${req.baseUrl}${req.url} -> ${url}`);

        req.pipe(request(url)).pipe(res);
      });
      

 };
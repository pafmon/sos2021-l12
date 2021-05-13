<script>
    import {
        onMount
    } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    
 
    let contacts = [];
    let newContact ={
        name: "",
        phone: ""
    }

    const BASE_CONTACT_API_PATH = "/api/v1";

    async function getContacts(){
        console.log("Fetching contacts...");
        const res = await fetch(BASE_CONTACT_API_PATH+"/contacts");

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            contacts = json;
            console.log(`We have received ${contacts.length} contacts.`);
        }else{
            console.log("Error!");
        }
    }   

    async function insertContact(){
        console.log("Inserting contact "+ JSON.stringify(newContact));

        const res = await fetch(BASE_CONTACT_API_PATH+"/contacts",
                            {
                                method: "POST",
                                body: JSON.stringify(newContact),
                                headers:{
                                    "Content-Type": "application/json"
                                }
                            }
                           ).then( (res) => {
                               getContacts();
                           })
    }
    
    async function deleteContact(contactName){
        console.log("Deleting contact with name "+ contactName);

        const res = await fetch(BASE_CONTACT_API_PATH+"/contacts/"+contactName,
                            {
                                method: "DELETE"
                            }
                           ).then( (res) => {
                               getContacts();
                           })
    }
    onMount(getContacts);
</script>

<main>
    <h1>Contacts</h1>
    <Table bordered>
        <thead>
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value="{newContact.name}"></td>
                <td><input bind:value="{newContact.phone}"></td>
                <td><Button on:click={insertContact}>Insert</Button></td>
            </tr>
            {#each contacts as contact}
                <tr>
                    <td><a href="#/contact/{contact.name}">{contact.name}</a></td>
                    <td>{contact.phone}</td>
                    <td><Button on:click={deleteContact(contact.name)}>Delete</Button></td>
                </tr>
            {/each}
        </tbody>
    </Table>
</main>


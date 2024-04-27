// Javascript file for website functionality

(async () => {

    /////////////////////////////      HELPER FUNCTIONS        //////////////////////////////

    /////////////////////////////      MENU        //////////////////////////////

    // Fetches menu items from the database
    const getMenu = async () => {
        const menu = await fetch('/api/v1/menu')
        const menuData = await menu.json()

        return await menuData
    }
    
    // Updates a menu item in the database
    const updateMenuItem = async (id, menuData) => {
        try {
            const response = await fetch(`/api/v1/menu/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(menuData)
            })
            const responseData = await response.json()
            return responseData
        } catch (error) {
            console.error('Error updating menu:', error)
        }
    }

    // Deletes a menu item from the database
    const deleteMenuItem = async (id) => {
        const response = await fetch(`/api/v1/menu/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }})

        return await response.json()
    }

    // Adds a menu item to the database
    const addMenuItem = async (menuData) => {
        try {
            const items = await fetch('/api/v1/menu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(menuData)
            })
            const responseData = await items.json()
    
            return responseData
        } catch (error) {
            console.error('Error adding event:', error)
        }
    }

    /////////////////////////////      EVENTS        //////////////////////////////

    // Adds an event to the database
    const addEvent = async (eventData) => {
        try {
            const events = await fetch('/api/v1/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            })
            const responseData = await events.json()
    
            return responseData
        } catch (error) {
            console.error('Error adding event:', error)
        }
    }

    // Fetches events from the database
    const getEvents = async () => {
        const events = await fetch('/api/v1/events')
        const eventData = await events.json()

        return await eventData
    }

    // Updates an event in the database
    const updateEvent = async (id, eventData) => {
        try {
            const response = await fetch(`/api/v1/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            })
            const responseData = await response.json()
            return responseData
        } catch (error) {
            console.error('Error updating event:', error)
        }
    }

    // Deletes an event from the database
    const deleteEvent = async (id) => {
        const response = await fetch(`/api/v1/events/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }})

        return await response.json()
        
    }

    /////////////////////////////      SITE FUNCTIONALITY        //////////////////////////////

    /////////////////////////////      MENU        //////////////////////////////
    async function displayMainMenu(){
        const itemElement = document.createElement('div');
        try{
            const menuItems = document.getElementById('menu-items');
        menuItems.innerHTML = ''; // Clear existing content
  
        menuData.forEach(menuItem => {
          itemElement.classList.add('menu-item');
  
          // Create elements
          const itemName = document.createElement('h1');
          const itemDescription = document.createElement('p');
          const itemPrice = document.createElement('span');

          itemName.textContent = menuItem.name;
          itemDescription.textContent = menuItem.description;
          itemPrice.textContent = `$${menuItem.price}`;

          // Add elements
          itemElement.appendChild(itemName);
          itemElement.appendChild(itemDescription);
          itemElement.appendChild(itemPrice);
  
          menuItems.appendChild(itemElement);
        })
    }
    catch (error){
        console.error('Error fetching menu items:', error) 
    }
    }
        await displayMainMenu() // Call the function to fetch and display menu items
    /////////////////////////////      EVENTS        //////////////////////////////
    



    /////////////////////////////      ADMIN PAGE FUNCTIONALITY        //////////////////////////////
  
    /////////////////////////////      MENU        //////////////////////////////
    async function displayAdminMenu() {
        const row = document.createElement('tr')
        const addButton = row.querySelector('#add_button')
        const deleteButton = row.querySelector(`#delete-button-${item._id}`)
        const updateButton = row.querySelector(`#update-button-${item._id}`)
        try {
            const menu = await getMenu()
            const menuBody = document.querySelector('#menu tbody')
            // Populates rows
            menu.forEach(item => {
                row.innerHTML = `
                    <td><input type="text" value="${item.name}"></td>
                    <td><input type="text" value="${item.description}"></td>
                    <td><input type="text" value="${item.price}"></td>
                    <td>
                        <button id="update-button-${item._id}">Update</button>
                        <button id="delete-button-${item._id}">Delete</button>
                    </td>
                `
            menuTableBody.appendChild(row)
            updateButton.addEventListener('click', async () => {
                const updatedName = row.querySelector('td:nth-child(1) input').value
                const updatedDescription = row.querySelector('td:nth-child(2) input').value
                const updatedPrice = row.querySelector('td:nth-child(3) input').value

                // update data
                const updatedMenuItemData = {
                    name: updatedName,
                    description: updatedDescription,
                    price: updatedPrice
                }
                await updateMenuItem(item._id, updatedMenuItemData)
                window.location.reload()
            })
            //  deleting menu item
            deleteButton.addEventListener('click', async () => {
                await deleteMenuItem(item._id)
                window.location.reload()
            })
            })
            // last row
            row.innerHTML = `
                <td><input type="text" id="new-item-name"></td>
                <td><input type="text" id="new-item-description"></td>
                <td><input type="text" id="new-item-price"></td>
                <td>
                    <button id="add_button">Add</button>
                </td>
            `
            menuTableBody.appendChild(row) 
            addButton.addEventListener('click', handleAddMenuItem)
        
        } catch (error) {
            console.error('Error fetching menu items:', error)
        }
    }
    
    await displayAdminMenu()

    /////////////////////////////      EVENTS        //////////////////////////////





    /////////////////////////////      DYNAMIC SITE BEHAVIOR (optional)       //////////////////////////////



})()
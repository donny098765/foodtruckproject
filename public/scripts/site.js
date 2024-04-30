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
        const menu = await getMenu()
        const menuItems = document.getElementById('menu-container');
        menuItems.innerHTML = ''; // Clear existing content
  
        menuData.forEach(menuItem => {

          itemElement.classList.add('menu-container');
  
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
    function toggleInfo(eventId) {
        const eventDetails = document.getElementById(eventId)
        eventDetails.classList.toggle('hidden')
    }
    
    async function displayEvents() {
        const container = document.getElementById('events-container')
    
        try {
            const eventsData = await getEvents()
            eventsData.sort((a, b) => new Date(a.dates) - new Date(b.dates))

            eventsData.forEach((event, index) => {
                const eventCard = document.createElement('div')
                const details = document.createElement('div')

                eventCard.classList.add('event')
                eventCard.innerHTML = `<h3>${event.name}</h3>`
                eventCard.addEventListener('click', () => toggleInfo(`event${index}`))
    
                details.classList.add('event-details', 'hidden')
                details.id = `event${index}`
                details.innerHTML = `
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Date:</strong> ${event.dates}</p>
                    <p><strong>Hours:</strong> ${event.hours}</p>
                `
                container.appendChild(eventCard)
                container.appendChild(details)
            })
        } catch (error) {
            console.error('Error fetching events:', error)
        }
    }
    await displayEvents()

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
async function displayAdminEvents() {
    try {
        const events = await getEvents()
        const eventBody = document.querySelector('#event-table tbody')
        const row = document.createElement('tr')

        events.sort((a, b) => new Date(a.dates) - new Date(b.dates))
        events.forEach(event => {
            const updateButton = row.querySelector(`#update-button-${event._id}`)
            const deleteButton = row.querySelector(`#delete-button-${event._id}`)
            const addButton = row.querySelector('#add_button')
            row.innerHTML = `
                <td><input type="text" value="${event.name}"></td>
                <td><input type="text" value="${event.location}"></td>
                <td><input type="text" value="${event.dates}"></td>
                <td><input type="text" value="${event.hours}"></td>
                <td>
                    <button id="update-button-${event._id}">Update</button>
                    <button id="delete-button-${event._id}">Delete</button>
                </td>
            `
            eventBody.appendChild(row)

            updateButton.addEventListener('click', async () => {
                const updateName = row.querySelector('td:nth-child(1) input').value
                const updateLocation = row.querySelector('td:nth-child(2) input').value
                const updateDate = row.querySelector('td:nth-child(3) input').value
                const updateHours = row.querySelector('td:nth-child(4) input').value

                const updatedEventData = {
                    name: updateName,
                    location: updateLocation,
                    dates: updateDate,
                    hours: updateHours
                }

                await updateEvent(event._id, updatedEventData)
                window.location.reload()
            })

            deleteButton.addEventListener('click', async () => {
                await deleteEvent(event._id)
                window.location.reload()
            })
        })

        row.innerHTML = `
            <td><input type="text" id="new-event-name"></td>
            <td><input type="text" id="new-event-location"></td>
            <td><input type="date" id="new-event-date"></td>
            <td><input type="text" id="new-event-hours"></td>
            <td>
                <button id="add_button">Add</button>
            </td>
        `
        eventBody.appendChild(row)
        addButton.addEventListener('click', handleAddEvent)

    } catch (error) {
        console.error('Error fetching events:', error)
    }
}
await displayAdminEvents()

    /////////////////////////////      DYNAMIC SITE BEHAVIOR (optional)       //////////////////////////////

    window.addEventListener('scroll', () => {
        const header = document.querySelector('header')
        const nav = document.querySelector('nav')

        if (window.scrollY > header.offsetHeight - 100) {
            nav.style.position = 'fixed'
            nav.style.top = '0'
            nav.style.width = '90%'
            nav.style.transition = 'margin-top 0.3s ease'
            nav.style.margin = '0 5%'
            nav.style.marginTop = '20px'
            header.style.marginBottom = `${nav.offsetHeight}px`
        } else {
            nav.style.width = '100%'
            nav.style.position = 'static'
            nav.style.transition = 'margin-top 0.3s ease'
            header.style.marginBottom = '0'
            nav.style.margin = '0'
            nav.style.marginRight = '20px'
        }
    })

})()
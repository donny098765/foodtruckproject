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

    /////////////////////////////      EVENTS        //////////////////////////////
    



    /////////////////////////////      ADMIN PAGE FUNCTIONALITY        //////////////////////////////

    /////////////////////////////      MENU        //////////////////////////////


    /////////////////////////////      EVENTS        //////////////////////////////





    /////////////////////////////      DYNAMIC SITE BEHAVIOR (optional)       //////////////////////////////



})()
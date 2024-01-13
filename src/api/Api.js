export default class Api {

    static login(username, password) {
        const user = { player_ID: username, password: password };
        return fetch("https://balandrau.salle.url.edu/i3/players/join", {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                
        },
            body: JSON.stringify(user)

        })
    }

     static listGames(token) {
        
        return fetch("https://balandrau.salle.url.edu/i3/arenas", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        })
    }

    static deleteUser(token) {
        
        return fetch("https://balandrau.salle.url.edu/i3/players", {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        })
    }

    static getCurrentPlayerGames(token) {
        
        return fetch("https://balandrau.salle.url.edu/i3/players/arenas/current", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        })
    }

    static joinGame(token, id) {

        let link = 'https://balandrau.salle.url.edu/i3/arenas/'+ id +'/play';
        
        return fetch(link, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        })
    }

    static leaveGame(token, id) {

        let link = 'https://balandrau.salle.url.edu/i3/arenas/'+ id +'/play';
        
        return fetch(link, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        })
    }

    static createGame(token, game_ID, size, HP_max) {
        const requested_body = { game_ID: game_ID, size: size, HP_max: HP_max };
        return fetch("https://balandrau.salle.url.edu/i3/arenas", {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Bearer': '' + token
                
        },
            body: JSON.stringify(requested_body)

        })
    }

    static listPlayers(token) {
        
        return fetch("https://balandrau.salle.url.edu/i3/players", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        })
    }

    static getBuyableAttacks(token) {
        
        return fetch("https://balandrau.salle.url.edu/i3/shop/attacks", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        })
    }

    static buyAttack(token, id) {

         
        let link = `https://balandrau.salle.url.edu/i3/shop/attacks/${id}/buy`;

        
        return fetch(link, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        })
    }

    static getAttacksFromTheUser(token) {
        let link = `https://balandrau.salle.url.edu/i3/players/attacks`;

        return fetch(link, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        })
    }

    static getStats(token) {
        let link = `https://balandrau.salle.url.edu/i3/players/statistics`;

        return fetch(link, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        })
    }

    static getLogs(token, game_ID) {
        let link = `https://balandrau.salle.url.edu/i3/arenas/${game_ID}/logs`;

        return fetch(link, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        })
    }

    static sellAttack(token, id, price) {

        const requested_body = {   price:   parseFloat(price) };
        let link = `https://balandrau.salle.url.edu/i3/shop/attacks/${id}/sell`;


        return fetch(link, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        body: JSON.stringify(requested_body)
        })
    }

    static move(token, message, attackId) {

        this.direction(token, message);
        this.attack(token, attackId);

        const requested_body = {
            movement: message
        };

        let link = `https://balandrau.salle.url.edu/i3/arenas/move`;

        return fetch(link, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        body: JSON.stringify(requested_body)
        })
    }

    static direction(token, message) {

        const requested_body = {
            direction: message
        };

        let link = `https://balandrau.salle.url.edu/i3/arenas/direction`;

        return fetch(link, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        body: JSON.stringify(requested_body)
        })
    }

    static attack(token, attackId) {
        let link = `https://balandrau.salle.url.edu/i3/arenas/attack/${attackId}`;

        return fetch(link, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        })
    }

    static createAttack(token, attack_ID, positions, img) {
        const requested_body = { 
            attack_ID: attack_ID,
            positions: positions,
            img: img
           };
        return fetch("https://balandrau.salle.url.edu/i3/shop/attacks", {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Bearer': '' + token
                
        },
            body: JSON.stringify(requested_body)

        })
    }

    static getInfoFromAPlayer(token, id) {

         
        let link = `https://balandrau.salle.url.edu/i3/players/${id}`;

        
        return fetch(link, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        })
    }

    static getStatsFromAPlayer(token, id) {

         
        let link = `https://balandrau.salle.url.edu/i3/players/${id}/statistics`;

        
        return fetch(link, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        })
    }

    static equip(token, id) {

         
        let link = `https://balandrau.salle.url.edu/i3/players/attacks/${id}`;

        
        return fetch(link, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        })
    }

    static unEquip(token, id) {

        let link = `https://balandrau.salle.url.edu/i3/players/attacks/${id}`;

        return fetch(link, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
            'Bearer': '' + token
        },
        })
    }
    
    
}
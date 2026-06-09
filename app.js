
const TYPE_WEIGHTS = { 'placement': 3, 'result': 2, 'event': 1 };

class Notification {
    constructor(id, type, message) {
        this.id = id;
        this.type = type.toLowerCase();
        this.message = message;
        this.timestamp = Date.now();
        this.weight = TYPE_WEIGHTS[this.type] || 0;
    }
}


class PriorityInbox {
    constructor(capacity = 10) {
        this.capacity = capacity;
        this.heap = [];
    }

    add(notification) {
        this.heap.push(notification);
        
        this.heap.sort((a, b) => {
            if (a.weight !== b.weight) return a.weight - b.weight;
            return a.timestamp - b.timestamp;
        });

       
        if (this.heap.length > this.capacity) {
            this.heap.shift(); 
        }
        
        this.render();
    }

  
    render() {
        const inboxDiv = document.getElementById('priority-inbox');
        inboxDiv.innerHTML = '';

       
        const displayList = [...this.heap].reverse();

        displayList.forEach((notif, index) => {
            const div = document.createElement('div');
            div.className = `notification-item ${notif.type}`;
            const timeStr = new Date(notif.timestamp).toLocaleTimeString();
            div.innerHTML = `<span class="rank">#${index + 1}</span> [${timeStr}] <strong>${notif.type.toUpperCase()}</strong>: ${notif.message}`;
            inboxDiv.appendChild(div);
        });
    }
}

const inbox = new PriorityInbox(10);
let count = 1;

const mockData = [
    { type: 'event', msg: "Annual sports day announcement" },
    { type: 'result', msg: "Mid-term exam results published" },
    { type: 'placement', msg: "Google recruitment drive open" },
    { type: 'event', msg: "Guest lecture on AI at 3 PM" },
    { type: 'placement', msg: "Microsoft interview shortlists out" },
    { type: 'result', msg: "Re-evaluation forms available" },
    { type: 'event', msg: "Club orientations starting tonight" },
    { type: 'placement', msg: "Netflix internship application open" },
    { type: 'result', msg: "Hackathon winners announced" },
    { type: 'event', msg: "Library closing hours extended" },
    { type: 'placement', msg: "Apple hiring for SWE roles" },
    { type: 'result', msg: "Coding contest scores live" },
    { type: 'event', msg: "Lost keys found at cafeteria" },
    { type: 'placement', msg: "Amazon pool campus registration" },
    { type: 'event', msg: "Maintenance shutdown notice" }
];

function simulateStream() {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= mockData.length) {
            clearInterval(interval);
            return;
        }

        const data = mockData[i];
        const notif = new Notification(`NOTIF-${100 + count}`, data.type, data.msg);
        
      
        const liveDiv = document.getElementById('live-stream');
        const p = document.createElement('p');
        p.style.fontSize = "13px";
        p.innerText = `New Arrived -> ${notif.type.toUpperCase()}: ${notif.message}`;
        liveDiv.insertBefore(p, liveDiv.firstChild);

        
        inbox.add(notif);

        count++;
        i++;
    }, 400); 
}
// Define a class for Process
class Process {
    constructor(id, arrivalTime, burstTime) {
      this.id = id;
      this.arrivalTime = arrivalTime;
      this.burstTime = burstTime;
      this.remainingTime = burstTime; // For SRTF, we need to track the remaining time
      this.startTime = 0; // Initialize start time
      this.completionTime = 0; // Initialize completion time
      this.waitingTime = 0; // Initialize waiting time
      this.turnaroundTime = 0; // Initialize turnaround time
    }
  }
  
  let processes = []; // Array to store processes entered by the user
  
  // Function to add a process from user input
  function addProcess() {
    const processId = parseInt(document.getElementById('processId').value);
    const arrivalTime = parseInt(document.getElementById('arrivalTime').value);
    const burstTime = parseInt(document.getElementById('burstTime').value);
  
    if (!isNaN(processId) && !isNaN(arrivalTime) && !isNaN(burstTime)) {
      // Create new process object and add to the array
      processes.push(new Process(processId, arrivalTime, burstTime));
      // Clear input fields
      document.getElementById('processId').value = '';
      document.getElementById('arrivalTime').value = '';
      document.getElementById('burstTime').value = '';
      // Display added process in the output
      displayProcesses();
    } else {
      alert('Please enter valid numbers for Process ID, Arrival Time, and Burst Time.');
    }
  }
  
  // Function to delete a process
  function deleteProcess(index) {
    processes.splice(index, 1);
    displayProcesses();
  }
  
  // Function to display processes entered by the user
  function displayProcesses() {
    let output = '<h2>Entered Processes:</h2>';
    output += '<table>';
    output += '<tr><th>Process ID</th><th>Arrival Time</th><th>Burst Time</th><th>Actions</th></tr>';
    for (let i = 0; i < processes.length; i++) {
      output += `<tr><td>${processes[i].id}</td><td>${processes[i].arrivalTime}</td><td>${processes[i].burstTime}</td><td><button onclick="deleteProcess(${i})">Delete</button></td></tr>`;
    }
    output += '</table>';
    document.getElementById('processTable').innerHTML = output;
  }
  
  // Function to simulate SRTF scheduling and calculate average waiting time and turnaround time
  function startSimulation() {
    let currentTime = 0; // Current time of the simulation
    let totalWaitingTime = 0; // Total waiting time for all processes
    let totalTurnaroundTime = 0; // Total turnaround time for all processes
    let completedProcesses = 0;
    let readyQueue = [];
    let currentProcess = null;
  
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime); // Sort processes by arrival time
  
    while (completedProcesses < processes.length) {
      // Add all processes that have arrived by the current time to the ready queue
      for (let process of processes) {
        if (process.arrivalTime <= currentTime && !readyQueue.includes(process) && process.remainingTime > 0) {
          readyQueue.push(process);
        }
      }
  
      if (readyQueue.length === 0) {
        currentTime++;
        continue;
      }
  
      // Sort the ready queue by remaining time (SRTF)
      readyQueue.sort((a, b) => a.remainingTime - b.remainingTime);
  
      currentProcess = readyQueue.shift(); // Get the process with the shortest remaining time
  
      // If this is the first time the process is being executed, set the start time
      if (currentProcess.startTime === 0) {
        currentProcess.startTime = currentTime;
      }
  
      // Simulate the execution of the process for one unit of time
      currentProcess.remainingTime--;
      currentTime++; // Update current time after execution
  
      // If the process is completed, calculate its times
      if (currentProcess.remainingTime === 0) {
        currentProcess.completionTime = currentTime;
        currentProcess.turnaroundTime = currentProcess.completionTime - currentProcess.arrivalTime;
        currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime;
  
        // Add to totals
        totalWaitingTime += currentProcess.waitingTime;
        totalTurnaroundTime += currentProcess.turnaroundTime;
        
        completedProcesses++;
      } else {
        // If not completed, add it back to the ready queue
        readyQueue.push(currentProcess);
      }
    }
  
    // Calculate average waiting time and turnaround time
    const avgWaitingTime = totalWaitingTime / processes.length;
    const avgTurnaroundTime = totalTurnaroundTime / processes.length;
  
    // Display the simulation output and averages on the webpage
    let output = '<h2>Simulation Results:</h2>';
    output += '<table>';
    output += '<tr><th>Process ID</th><th>Arrival Time</th><th>Burst Time</th><th>Waiting Time</th><th>Turnaround Time</th></tr>';
    for (let i = 0; i < processes.length; i++) {
      output += `<tr><td>${processes[i].id}</td><td>${processes[i].arrivalTime}</td><td>${processes[i].burstTime}</td><td>${processes[i].waitingTime}</td><td>${processes[i].turnaroundTime}</td></tr>`;
    }
    output += '</table>';
    output += `<p><strong>Average Waiting Time:</strong> ${avgWaitingTime.toFixed(2)} units</p>`;
    output += `<p><strong>Average Turnaround Time:</strong> ${avgTurnaroundTime.toFixed(2)} units</p>`;
    document.getElementById('simulationResults').innerHTML = output;
  }
  
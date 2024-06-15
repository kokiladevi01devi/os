// Define a class for Process
class Process {
    constructor(id, arrivalTime, burstTime) {
      this.id = id;
      this.arrivalTime = arrivalTime;
      this.burstTime = burstTime;
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
  
  // Function to display processes entered by the user
  function displayProcesses() {
    let output = '<h2>Entered Processes:</h2>';
    output += '<table>';
    output += '<tr><th>Process ID</th><th>Arrival Time</th><th>Burst Time</th><th>Action</th></tr>';
    for (let i = 0; i < processes.length; i++) {
      output += `<tr><td>${processes[i].id}</td><td>${processes[i].arrivalTime}</td><td>${processes[i].burstTime}</td><td><button onclick="deleteProcess(${i})">Delete</button></td></tr>`;
    }
    output += '</table>';
    document.getElementById('processTable').innerHTML = output;
  }
  
  // Function to delete a process
  function deleteProcess(index) {
    if (index >= 0 && index < processes.length) {
      processes.splice(index, 1); // Remove the process from the array
      displayProcesses(); // Update the displayed processes
    }
  }
  
  // Function to simulate FCFS scheduling and calculate average waiting time and turnaround time
  function startSimulation() {
    let currentTime = 0; // Current time of the simulation
    let totalWaitingTime = 0; // Total waiting time for all processes
    let totalTurnaroundTime = 0; // Total turnaround time for all processes
  
    // Sort processes by arrival time (if not already sorted)
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
  
    // Execute processes in FCFS order
    for (let i = 0; i < processes.length; i++) {
      const process = processes[i];
      // If the current time is less than arrival time, wait
      if (currentTime < process.arrivalTime) {
        currentTime = process.arrivalTime;
      }
      // Set start time
      process.startTime = currentTime;
      // Simulate the execution of the process
      currentTime += process.burstTime; // Update current time after execution
      // Set completion time
      process.completionTime = currentTime;
      // Calculate waiting time
      process.waitingTime = process.startTime - process.arrivalTime;
      // Calculate turnaround time
      process.turnaroundTime = process.completionTime - process.arrivalTime;
      // Add to totals
      totalWaitingTime += process.waitingTime;
      totalTurnaroundTime += process.turnaroundTime;
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
  
/**
 * @param {string} identifierValue - The user's email or username.
 * @param {object} context - Additional context about the request.
 * @param {function} callback - The callback to execute when done.
 */
function getUser(identifierValue, context, callback) {
  // NOTE: This script does not include any debugging or Firebase logic.
  
  // --- Execution Start ---

  const email = identifierValue;
  
  if (!email || !email.includes('@')) {
    // Return null if the identifier is invalid, proceeding to create if configured.
    return callback(null);
  }
  
  // --- EXTERNAL DB READ ---
  // In a production environment, this is where you would call your external 
  // database API to look up the user by email.
  // Example: lookupUser(email, (err, userRecord) => { ... });
  
  // SIMULATION: Assume the user ID is retrieved from the external store.
  // The user ID should match the one generated in the create script.
  const simulatedUserId = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '_');
  
  // For simplicity, we are simulating a successful lookup if the email is valid.
  // To simulate "User Not Found", you would set userIdToReturn = null;
  const userIdToReturn = simulatedUserId; 
  // ---------------------------

  if (userIdToReturn) {
    // --- USER FOUND ---
    
    // Return the found profile to Auth0.
    // CRITICAL: email_verified: true must be consistent with the create script.
    return callback(null, {
      user_id: userIdToReturn,
      email: email,
      app_metadata: {},
      email_verified: true 
    });
  } else {
    // --- USER NOT FOUND ---
    
    // Call callback(null) to tell Auth0 to proceed to the 'create' script.
    return callback(null); 
  }
}

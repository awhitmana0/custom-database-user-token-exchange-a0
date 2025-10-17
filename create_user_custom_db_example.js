/**
 * @param {object} user - Contains user information like email and password.
 * @param {function} callback - The callback to execute when done.
 */
function create(user, callback) {
  // NOTE: This script does not include any debugging or Firebase logic.
  
  // --- Helper Functions ---
  
  // This function ensures the user_id returned matches the Action's expectations.
  function generateUserId(email) {
    // The user ID must be consistent with the ID passed in the Action (the part before the colon).
    const safeLocalPart = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '_');
    return `${safeLocalPart}`; 
  }

  try {
    if (!user || !user.email) {
      return callback(new Error('Script Error: The user object or user email is missing.'));
    }

    const email = user.email;

    // 1. Generate the user_id locally.
    const userId = generateUserId(email);

    // 2. --- EXTERNAL DB WRITE ---
    // In a production environment, this is where you would call your external 
    // database API to create the new user record, saving the user_id and email.
    // Example: saveUser({ email: email, userId: userId });
    console.log(`[EXTERNAL DB WRITE]: User created with ID: ${userId}`);
    // ---------------------------

    // 3. Return the success response to Auth0.
    // CRITICAL: email_verified: true asserts the user identity was confirmed 
    // upstream by the Custom Token Exchange Action.
    return callback(null, {
      user_id: userId,
      email: email,
      email_verified: true,
      app_metadata: {}
    });

  } catch (err) {
    console.error('An unexpected error occurred in the create script:', err);
    return callback(err);
  }
}

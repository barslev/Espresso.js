/*
 * EspressoJS - Hippie's Fav Server Plate
 * Powered by Vimedev.com Labs
 * ----------------
 * Get Artsy!
 */
module.exports = (app) => {
    const cfg = require('.')
    const cmd_header = 'We are brewing your Espresso';
    const cmd_nl = '\n';
    const cmd_ct = `
      ( (
        ) )
    ........
    | .VMD |]
    |      /    
     '----'/_zik...
    `;
    const cmd_ready = 'Your Espresso is ready!';
    const cmd_port = `Live Preview: http://localhost:${process.env.PORT || cfg.port}`
    console.warn(`${cmd_header + cmd_nl + cmd_ct + cmd_nl + cmd_ready + cmd_nl + cmd_port + cmd_nl}`);
};
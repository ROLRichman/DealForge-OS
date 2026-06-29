/* ==========================================
   RO'Lyfe Media Intelligence Center
   Main Application Engine
   ========================================== */

const APP = {
    name: "RO'Lyfe Media Intelligence Center",
    version: "2.0.0",
    author: "Root Of Lyfe Holdings LLC",
    initialized: false
};

document.addEventListener("DOMContentLoaded", async () => {

    console.log(`Starting ${APP.name} v${APP.version}`);

    try {

        await loadResources();

        await Router.init();

        APP.initialized = true;

        console.log("Application Ready.");

    } catch (err) {

        console.error(err);

    }

});

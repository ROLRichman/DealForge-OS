/* ==========================================
   RO'Lyfe Router
========================================== */

const Router = {

    container: null,

    async init() {

        this.container = document.getElementById("app");

        await this.load("dashboard");

    },

    async load(page) {

        try {

            const response = await fetch(`modules/${page}.html`);

            if (!response.ok)
                throw new Error(`Unable to load ${page}.html`);

            const html = await response.text();

            this.container.innerHTML = html;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            console.log(`${page} loaded.`);

        }

        catch (err) {

            console.error(err);

            this.container.innerHTML = `
                <div class="card">
                    <h2>Module Not Found</h2>
                    <p>${page}.html could not be loaded.</p>
                </div>
            `;

        }

    }

};

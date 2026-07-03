// ==========================================
// RO'Lyfe Database Engine
// DealForge OS
// ==========================================

class Database {

    static async load(file) {

        try {

            const response = await fetch(file);

            if (!response.ok)
                throw new Error(`Unable to load ${file}`);

            return await response.json();

        } catch (err) {

            console.error(err);

            return [];

        }

    }

    static async save(key, data) {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

    }

    static get(key) {

        const data = localStorage.getItem(key);

        if (!data) return [];

        return JSON.parse(data);

    }

    static delete(key) {

        localStorage.removeItem(key);

    }

    static export(key) {

        const data = localStorage.getItem(key);

        const blob = new Blob(
            [data],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = `${key}.json`;

        a.click();

        URL.revokeObjectURL(url);

    }

}

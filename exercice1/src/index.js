/**
 * Filtre une liste d'users et retourne uniquement ceux qui ont 18 ans ou plus.
 * @param {Array<{name: string, dob: string}>} users - Tableau d'objets utilisateur avec nom et date de naissance
 * @returns {Array<{name: string, dob: string}>} Tableau d'users majeurs (18 ans ou plus)
 */
function getAdults(users) {
    const aujourdhui = new Date();
    
    return users.filter(utilisateur => {
        const dob = new Date(utilisateur.dob);
        const age = aujourdhui.getFullYear() - dob.getFullYear();
        
        // Ajuster l'âge si l'anniversaire n'a pas encore eu lieu cette année
        const diffMois = aujourdhui.getMonth() - dob.getMonth();
        const diffJours = aujourdhui.getDate() - dob.getDate();
        
        if (diffMois < 0 || (diffMois === 0 && diffJours < 0)) {
            return age - 1 >= 18;
        }
        
        return age >= 18;
    });
}

const users = [
    { name: "Alice", dob: "2000-02-29" },
    { name: "Bob", dob: "1990-12-31" },
    { name: "Charlie", dob: "2005-08-28" },
];

console.log("users:", getAdults(users));

module.exports = { getAdults };

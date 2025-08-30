const { getAdults } = require('./index');

describe('getAdults', () => {
    // Simuler une date fixe pour rendre les tests déterministes
    const dateMock = new Date('2024-03-19');
    const DateReelle = Date;
    
    beforeAll(() => {
        global.Date = class extends Date {
            constructor(date) {
                if (date) {
                    return super(date);
                }
                return dateMock;
            }
        };
    });

    afterAll(() => {
        global.Date = DateReelle;
    });

    test('devrait retourner un tableau vide pour une entrée vide', () => {
        expect(getAdults([])).toEqual([]);
    });

    test('devrait correctement identifier les personnes majeures', () => {
        const utilisateurs = [
            { name: "Alice", dob: "2000-02-29" },  // 24 ans
            { name: "Bob", dob: "1990-12-31" },  // 33 ans
            { name: "Charlie", dob: "2005-08-28" },  // 18 ans
            { name: "Exactement 18 ans aujourd'hui", dob: "2006-03-19" },  // Exactement 18 ans aujourd'hui
            { name: "Pas encore 18 ans", dob: "2006-03-20" },  // Pas encore 18 ans
        ];

        const majeurs = getAdults(utilisateurs);
        expect(majeurs).toHaveLength(4);
        expect(majeurs.map(u => u.name)).toEqual(["Alice", "Bob", "Charlie", "Exactement 18 ans aujourd'hui"]);
    });

    test('devrait gérer les dates de naissance des années bissextiles', () => {
        const utilisateurBissextile = [{ name: "NeLeapYear", dob: "2000-02-29" }];
        const majeurs = getAdults(utilisateurBissextile);
        expect(majeurs).toHaveLength(1);
    });

    test('devrait gérer les dates invalides correctement', () => {
        const utilisateursInvalides = [{ name: "DateInvalide", dob: "date-invalide" }];
        expect(() => getAdults(utilisateursInvalides)).not.toThrow();
        expect(getAdults(utilisateursInvalides)).toEqual([]);
    });
});

const Profile = require('../model/Profile')

module.exports = {
    async index(req, res){
        return res.render('profile', { profile: await Profile.get() })
    },

    async update(req, res){
        //req.body para pegar os dados
        const data = req.body
        //definir quantas semnas tem num ano
        const weeksPerYear = 52
        // remover as semanas de ferias do ano
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
        //quantas horas por semana estou trabalhando
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        //horas trabalhadas no mes
        const monthTotalHours = weekTotalHours * weeksPerMonth

        //qual sera o valor da minha horas
        const valueHour = data["value-hour"] = data["monthly-budget"] / monthTotalHours

        const profile = await Profile.get()

        await Profile.update({
            ...profile,
            ...req.body,
            "value-hour": valueHour
        })
        
        return res.redirect('/profile')
    }
}
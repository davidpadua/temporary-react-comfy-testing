export const formatPrice = (number) => {

    return new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR',
    }).format(number / 100)


}

export const getUniqueValues = (data, type) => {
    //::: acedo à propriedade dinamicamente, vou aos products na api e procuro pela 'category', etc >> https://course-api.com/react-store-products
    //::: exemplo: const categories = getUniqueValues(all_products, 'category'); sendo que data é all_products é e o item é 'category' e dinamicamente item[type] é a prop 'category'
    let unique = data.map((item) => item[type]) 
    
    //::: aqui fazemos o FLAT DO ARRAY DAS COLORS de 'colors' peoperty porque vem como array e precisamos que venha no mesmo estilo dos outros:
    //::: categories >>  ['all', 'office', 'living room', 'kitchen', 'bedroom', 'dining', 'kids']

    if(type === 'colors') {
        unique = unique.flat(); //::: colors >>['all', '#ff0000', '#00ff00', '#0000ff', '#000', '#ffb900']
    }
    
    return ['all', ...new Set(unique)] // retira só os valores únicos da lista all, método de javascriot new Set()

}

export default function formatToCurrency(amount){
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
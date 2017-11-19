import config from "./config"

let select2_ajax_params = {
    offer: {
        url: 'Offer2/getReportOffer'
    },
    offer2: {
        url: 'Offer/searchReportOfferByKeywords'
    },
    offer2_4Ocpa: {
        url: 'Offer/searchReportOfferByKeywords4Ocpa'
    },
    affiliate: {
        url: 'Affiliate/search'
    },
    app: {
        url: "Publisher/searchApp"
    },
    affiliate_4Ocpa: {
        url: 'Affiliate/search4Ocpa'
    },
    referral: {
        url: 'Affiliate/searchAffiliateByKeywords'
            // url: '/Passport/searchAffiliateByParent'
    },
    affiliate_getOtherReferral: {
        url: 'Affiliate/getOtherReferral'
    },
    cors: {
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    },
    referralAM: {
        url: 'Am/getAmByKeywords'
    },
    Advertiser:{
        url: 'Advertiser/searchAdvByKeywords'
    },
    Advertiser_4Ocpa:{
        url: 'Advertiser/searchAdvByKeywordsOcpa'
    },
    Advertiser_offer:{
        url:"Advertiser/getPassportAdvertiser"
    }
}
$.each(select2_ajax_params, function(i, n) {
    $.extend(n, select2_ajax_params.cors);
    if (n.url !== undefined) {
        n.url = config.api_path + n.url;
    }
})
export default select2_ajax_params

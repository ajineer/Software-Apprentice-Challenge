export const normailzeData = (ad) => {
  return {
    campaign: ad.campaign_name || ad.campaign || "",
    adset: ad.media_buy_name || ad.ad_group || ad.ad_squad_name || "",
    creative: ad.ad_name || ad.image_name || ad.creative_name || "",
    spend: ad.spend || ad.cost || 0,
    impressions: ad.impressions || ad.views || 0,
    clicks: ad.clicks || ad.post_clicks || 0,
  };
};

export const attachResults = (ads, gaData) => {
  return ads.map((ad) => {
    const matchingResults = gaData.filter(
      (entry) =>
        entry.utm_campaign === ad.campaign &&
        entry.utm_medium === ad.adset &&
        entry.utm_content === ad.creative
    );

    const totalResults = matchingResults.reduce(
      (sum, entry) => sum + entry.results,
      0
    );
    return {
      ...ad,
      results: totalResults,
    };
  });
};

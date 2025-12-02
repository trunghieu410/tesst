import { useState, useEffect } from "react";

export function useCampaignDetails(campaignId: string | number | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [campaignDetails, setCampaignDetails] = useState<any>(null);

  useEffect(() => {
    if (campaignId) {
      setIsLoading(true);
      // Mock API call
      console.log(`Fetching details for campaign ${campaignId}`);
      const timer = setTimeout(() => {
        setCampaignDetails({
          id: campaignId,
          name: "Mock Campaign Details",
          description: "This is a mock description fetched from API",
          // Add other mock fields as needed
        });
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setCampaignDetails(null);
    }
  }, [campaignId]);

  return { isLoading, campaignDetails };
}

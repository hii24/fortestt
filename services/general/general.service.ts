import { AxiosError, AxiosResponse } from 'axios';
import axiosInter from '@/api/interceptors';
import {
  getFeeSettingsUrl,
  getConstantNumericUrl,
  getConstantJsonUrl,
  getAMLThresholdUrl,
  getNetworkGateUrl,
} from '@/config/api.config';
import {
  FeeSettingsItem,
  ConstantNumeric,
  ConstantJson,
  AMLThreshold,
  NetworkGateResponse,
  NetworkGateRequest,
  GeneralFormState,
} from '@/types/general.interface';

export const GeneralService = {
  // Fee Settings
  async getFeeSettings(): Promise<FeeSettingsItem[]> {
    try {
      const res: AxiosResponse<FeeSettingsItem[]> = await axiosInter.get(getFeeSettingsUrl());
      console.log('Fee settings fetched:', res.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching fee settings:', error);
      throw error;
    }
  },

  async updateFeeSetting(id: number, data: Partial<FeeSettingsItem>): Promise<FeeSettingsItem> {
    try {
      const res: AxiosResponse<FeeSettingsItem> = await axiosInter.patch(getFeeSettingsUrl(`${id}/`), data);
      console.log('Fee setting updated:', res.data);
      return res.data;
    } catch (error) {
      console.error('Error updating fee setting:', error);
      throw error;
    }
  },

  // Constants - Numeric
  async getConstantNumeric(key: string): Promise<ConstantNumeric> {
    try {
      const res: AxiosResponse<ConstantNumeric> = await axiosInter.get(getConstantNumericUrl(key));
      console.log(`Numeric constant ${key} fetched:`, res.data);
      return res.data;
    } catch (error) {
      console.error(`Error fetching numeric constant ${key}:`, error);
      throw error;
    }
  },

  async updateConstantNumeric(key: string, value: number): Promise<ConstantNumeric> {
    try {
      const res: AxiosResponse<ConstantNumeric> = await axiosInter.patch(getConstantNumericUrl(key), { value });
      console.log(`Numeric constant ${key} updated:`, res.data);
      return res.data;
    } catch (error) {
      console.error(`Error updating numeric constant ${key}:`, error);
      throw error;
    }
  },

  // Constants - JSON
  async getConstantJson(key: string): Promise<ConstantJson> {
    try {
      const res: AxiosResponse<ConstantJson> = await axiosInter.get(getConstantJsonUrl(key));
      console.log(`JSON constant ${key} fetched:`, res.data);
      return res.data;
    } catch (error) {
      console.error(`Error fetching JSON constant ${key}:`, error);
      throw error;
    }
  },

  async updateConstantJson(key: string, value: any): Promise<ConstantJson> {
    try {
      const res: AxiosResponse<ConstantJson> = await axiosInter.patch(getConstantJsonUrl(key), { value });
      console.log(`JSON constant ${key} updated:`, res.data);
      return res.data;
    } catch (error) {
      console.error(`Error updating JSON constant ${key}:`, error);
      throw error;
    }
  },

  // AML Threshold
  async getAMLThreshold(): Promise<AMLThreshold> {
    try {
      const res: AxiosResponse<AMLThreshold> = await axiosInter.get(getAMLThresholdUrl('value/'));
      console.log('AML threshold fetched:', res.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching AML threshold:', error);
      throw error;
    }
  },

  async updateAMLThreshold(value: number): Promise<AMLThreshold> {
    try {
      const res: AxiosResponse<AMLThreshold> = await axiosInter.post(getAMLThresholdUrl(), { threshold: value });
      console.log('AML threshold updated:', res.data);
      return res.data;
    } catch (error) {
      console.error('Error updating AML threshold:', error);
      throw error;
    }
  },

  // Network Gate
  async toggleNetworkGate(gateEnabled: boolean = true): Promise<NetworkGateResponse> {
    try {
      const requestData = { gate_enabled: gateEnabled };
      console.log('Toggling network gate with data:', requestData);
      const res: AxiosResponse<NetworkGateResponse> = await axiosInter.post(getNetworkGateUrl('toggle-gate/'), requestData);
      console.log('Network gate toggled:', res.data);
      return res.data;
    } catch (error) {
      console.error('Error toggling network gate:', error);
      throw error;
    }
  },

  // Helper method to load all general settings
  async loadAllSettings(): Promise<Partial<GeneralFormState>> {
    try {
      const [feeSettings, riskScore, defaultAmount, defaultCurrency, platformGate] = await Promise.allSettled([
        this.getFeeSettings(),
        this.getAMLThreshold().catch(() => ({ threshold: 1.5 })),
        this.getConstantNumeric('default_amount').catch(() => ({ value: 0.5 })),
        this.getConstantJson('default_currency').catch(() => ({ value: { from: 'BTC', to: 'BTC' } })),
        this.getConstantNumeric('platform_gate').catch(() => ({ value: 1 })),
      ]);

      const settings: Partial<GeneralFormState> = {};

      // Fee settings
      if (feeSettings.status === 'fulfilled' && feeSettings.value.length > 0) {
        const fixedFee = feeSettings.value.find(f => f.fee_type === 'fixed');
        const floatFee = feeSettings.value.find(f => f.fee_type === 'float');
        
        if (fixedFee) settings.freeFixed = fixedFee.fixed_fee;
        if (floatFee) settings.freeFloat = floatFee.float_fee;
      }

      // Risk score
      if (riskScore.status === 'fulfilled') {
        settings.riskScore = riskScore.value.threshold;
      }

      // Default amount
      if (defaultAmount.status === 'fulfilled') {
        settings.defaultAmount = defaultAmount.value.value;
      }

      // Default currency
      if (defaultCurrency.status === 'fulfilled') {
        const currency = defaultCurrency.value.value;
        settings.defaultFromCurrency = currency.from || 'BTC';
        settings.defaultToCurrency = currency.to || 'BTC';
      }

      // Platform gate
      if (platformGate.status === 'fulfilled') {
        settings.platformGate = platformGate.value.value === 1;
      }

      console.log('All settings loaded:', settings);
      return settings;
    } catch (error) {
      console.error('Error loading all settings:', error);
      throw error;
    }
  },

  // Helper method to save all general settings
  async saveAllSettings(formData: GeneralFormState): Promise<void> {
    try {
      const updates = await Promise.allSettled([
        // Update fee settings
        this.getFeeSettings().then(feeSettings => {
          const fixedFee = feeSettings.find(f => f.fee_type === 'fixed');
          const floatFee = feeSettings.find(f => f.fee_type === 'float');
          
          const promises = [];
          if (fixedFee) {
            promises.push(this.updateFeeSetting(fixedFee.id, { fixed_fee: formData.freeFixed }));
          }
          if (floatFee) {
            promises.push(this.updateFeeSetting(floatFee.id, { float_fee: formData.freeFloat }));
          }
          return Promise.all(promises);
        }),
        
        // Update constants
        this.updateAMLThreshold(formData.riskScore),
        this.updateConstantNumeric('default_amount', formData.defaultAmount),
        this.updateConstantJson('default_currency', {
          from: formData.defaultFromCurrency,
          to: formData.defaultToCurrency,
        }),
        this.updateConstantNumeric('platform_gate', formData.platformGate ? 1 : 0),
      ]);

      console.log('All settings saved:', updates);
    } catch (error) {
      console.error('Error saving all settings:', error);
      throw error;
    }
  },
};
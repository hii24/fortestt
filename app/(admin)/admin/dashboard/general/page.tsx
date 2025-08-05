'use client';
import React, { useEffect, useState } from 'react';
import { GeneralService } from '@/services/general/general.service';
import { GeneralFormState } from '@/types/general.interface';
import { Button, Input, Select } from 'antd';
import styles from './styles.module.css';

export default function GeneralPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Состояние формы с правильными значениями из дизайна
  const [formData, setFormData] = useState<GeneralFormState>({
    freeFixed: 1.5,
    freeFloat: 0.45,
    riskScore: 1.5,
    defaultAmount: 0.5,
    defaultFromCurrency: 'BTC',
    defaultToCurrency: 'BTC',
    platformGate: true,
  });

  // Состояние для анимации переключателя Platform (точная копия CustomAniSwitcher)
  const [switchAnimStage, setSwitchAnimStage] = useState<'idle' | 'expanding' | 'shrinking'>('idle');

  const loadGeneralSettings = async () => {
    setIsLoading(true);
    try {
      const settings = await GeneralService.loadAllSettings();
      console.log('Loaded settings:', settings);
      
      // Обновляем форму полученными данными
      setFormData(prev => ({
        ...prev,
        ...settings,
      }));
    } catch (error) {
      console.error('Error loading general settings:', error);
      // При ошибке оставляем значения по умолчанию
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Загружаем только настройки General
    loadGeneralSettings();
  }, []);

  // Обработчик изменения значений формы
  const handleFormChange = (field: keyof GeneralFormState, value: number | string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Обработчик сохранения отдельного поля
  const handleSaveField = async (field: keyof GeneralFormState) => {
    setIsSaving(true);
    try {
      console.log(`Saving ${field}:`, formData[field]);
      
      // Сохраняем конкретное поле в зависимости от его типа
      switch (field) {
        case 'freeFixed':
          const feeSettings = await GeneralService.getFeeSettings();
          const fixedFee = feeSettings.find(f => f.fee_type === 'fixed');
          if (fixedFee) {
            await GeneralService.updateFeeSetting(fixedFee.id, { fixed_fee: formData[field] });
          }
          break;
          
        case 'freeFloat':
          const feeSettingsFloat = await GeneralService.getFeeSettings();
          const floatFee = feeSettingsFloat.find(f => f.fee_type === 'float');
          if (floatFee) {
            await GeneralService.updateFeeSetting(floatFee.id, { float_fee: formData[field] });
          }
          break;
          
        case 'riskScore':
          await GeneralService.updateConstantNumeric('risk_score', formData[field]);
          break;
          
        case 'defaultAmount':
          await GeneralService.updateConstantNumeric('default_amount', formData[field]);
          break;
          
        case 'defaultFromCurrency':
        case 'defaultToCurrency':
          await GeneralService.updateConstantJson('default_currency', {
            from: formData.defaultFromCurrency,
            to: formData.defaultToCurrency,
          });
          break;
          
        case 'platformGate':
          await GeneralService.updateConstantNumeric('platform_gate', formData[field] ? 1 : 0);
          break;
      }
      
      console.log(`${field} saved successfully`);
      alert(`${field} saved successfully!`);
    } catch (error) {
      console.error(`Error saving ${field}:`, error);
      alert(`Error saving ${field}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Обработчик общего сохранения
  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      console.log('Saving all settings:', formData);
      await GeneralService.saveAllSettings(formData);
      console.log('All settings saved successfully');
      alert('All settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert(`Error saving settings: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Обработчик переключения Platform (точная копия toggleSwitch)
  const handlePlatformToggle = async () => {
    if (switchAnimStage !== 'idle' || isSaving) return;

    setIsSaving(true);
    
    try {
      // Вызываем API для переключения gate
      await GeneralService.toggleNetworkGate();
      
      if (!formData.platformGate) {
        handleFormChange('platformGate', true);
        setSwitchAnimStage('expanding');
        setTimeout(() => setSwitchAnimStage('shrinking'), 150);
        setTimeout(() => setSwitchAnimStage('idle'), 300);
      } else {
        setSwitchAnimStage('expanding');
        setTimeout(() => {
          handleFormChange('platformGate', false);
          setSwitchAnimStage('shrinking');
        }, 150);
        setTimeout(() => setSwitchAnimStage('idle'), 300);
      }
      
      console.log('Platform gate toggled successfully');
    } catch (error) {
      console.error('Error toggling platform gate:', error);
      alert(`Error toggling platform gate: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Точная логика стилей из CustomAniSwitcher
  const getPlatformSwitchStyle = () => {
    let style = {};
    
    if (formData.platformGate) {
      if (switchAnimStage === 'idle') {
        // Коло з правим відступом 2px
        style = { left: 'calc(100% - 22px)', width: '20px' };
      } else if (switchAnimStage === 'expanding') {
        // Розтягується зліва
        style = { left: '2px', width: '40px' };
      } else if (switchAnimStage === 'shrinking') {
        // Повертається на праву сторону
        style = { left: 'calc(100% - 22px)', width: '20px' };
      }
    } else {
      if (switchAnimStage === 'idle') {
        // Коло з лівим відступом 2px
        style = { left: '2px', width: '20px' };
      } else if (switchAnimStage === 'expanding') {
        // Розтягується вправо
        style = { left: 'calc(100% - 22px)', width: '40px' };
      } else if (switchAnimStage === 'shrinking') {
        // Повертається на ліву сторону
        style = { left: '2px', width: '20px' };
      }
    }
    
    return style;
  };

  const currencyOptions = [
    { value: 'BTC', label: <span>BTC</span> },
    { value: 'XRP', label: <span>XRP</span> },
    { value: 'USDT', label: <span>USDT</span> },
  ];

      return (
    <div className="">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className={styles.header}>General</div>
          <div className={styles.contentWrapper}>
            <div className={styles.twoColumnLayout}>
              {/* Левая колонка */}
              <div className={styles.leftColumn}>
                {/* Free, % {fixed} */}
                <fieldset className={styles.fieldset}>
                  <div>
                    <span>{'Free, % {fixed}'}</span>
                    <div className="flex gap-1">
                      <Input 
                        value={formData.freeFixed}
                        onChange={(e) => handleFormChange('freeFixed', parseFloat(e.target.value) || 0)}
                        type="number"
                        step="0.01"
                      />
                      <Button 
                        className="px-2 rounded-[10px]" 
                        variant="solid" 
                        color="blue" 
                        size="large"
                        loading={isSaving}
                        disabled={isSaving}
                        onClick={() => handleSaveField('freeFixed')}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none">
                          <path
                            d="M4 12L8.94975 16.9497L19.5568 6.34314"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </fieldset>

                {/* Risk Score, % */}
                <fieldset className={styles.fieldset}>
                  <div>
                    <span>{'Risk Score, %'}</span>
                    <div className="flex gap-1">
                      <Input 
                        value={formData.riskScore}
                        onChange={(e) => handleFormChange('riskScore', parseFloat(e.target.value) || 0)}
                        type="number"
                        step="0.01"
                      />
                      <Button 
                        className="px-2 rounded-[10px]" 
                        variant="solid" 
                        color="blue" 
                        size="large"
                        loading={isSaving}
                        disabled={isSaving}
                        onClick={() => handleSaveField('riskScore')}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none">
                          <path
                            d="M4 12L8.94975 16.9497L19.5568 6.34314"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </fieldset>

                                {/* Default Amount */}
                <fieldset className={styles.fieldset}>
                  <div>
                    <span>{'Default Amount'}</span>
                    <div className="flex gap-1">
                      <Input 
                        value={formData.defaultAmount}
                        onChange={(e) => handleFormChange('defaultAmount', parseFloat(e.target.value) || 0)}
                        type="number"
                        step="0.01"
                      />
                      <Select
                        className="min-w-28"
                        size="large"
                        value={formData.defaultFromCurrency}
                        style={{ minWidth: 120 }}
                        onChange={(value) => handleFormChange('defaultFromCurrency', value)}
                        options={currencyOptions}
                      />
                      <Select
                        className="min-w-28"
                        size="large"
                        value={formData.defaultToCurrency}
                        style={{ minWidth: 120 }}
                        onChange={(value) => handleFormChange('defaultToCurrency', value)}
                        options={currencyOptions}
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Platform Section */}
                <fieldset className={styles.fieldset}>
                  <div>
                    <span>Platform</span>
                    <div className={styles.platformSection}>
                      <span className={styles.platformLabel}>Gate:</span>
                      <label className={`relative inline-flex items-center select-none ${isSaving ? 'cursor-wait' : 'cursor-pointer'}`}>
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          checked={formData.platformGate} 
                          disabled={isSaving}
                          onChange={handlePlatformToggle} 
                        />
                        <div className={`w-[45px] h-[26px] rounded-full border hover:bg-gray-50 border-[#3460FD] relative transition-colors duration-300 ${isSaving ? 'opacity-50' : ''}`}>
                          <div
                            className={`absolute top-[2px] h-[20px] bg-[#3460FD] transition-all duration-200 rounded-full ${formData.platformGate ? 'shadow-none' : 'shadow'} flex items-center justify-center`}
                            style={getPlatformSwitchStyle()}
                          >
                            <span className="text-white text-[10px] font-medium">
                              {isSaving ? '...' : (formData.platformGate ? 'ON' : 'OFF')}
                            </span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>

              {/* Правая колонка */}
              <div className={styles.rightColumn}>
                                {/* Free, % {float} */}
                <fieldset className={styles.fieldset}>
                  <div>
                    <span>{'Free, % {float}'}</span>
                    <div className="flex gap-1">
                      <Input 
                        value={formData.freeFloat}
                        onChange={(e) => handleFormChange('freeFloat', parseFloat(e.target.value) || 0)}
                        type="number"
                        step="0.01"
                      />
                      <Button 
                        className="px-2 rounded-[10px]" 
                        variant="solid" 
                        color="blue" 
                        size="large"
                        loading={isSaving}
                        disabled={isSaving}
                        onClick={() => handleSaveField('freeFloat')}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none">
                          <path
                            d="M4 12L8.94975 16.9497L19.5568 6.34314"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            {/* Кнопка Save в правом нижнем углу */}
            <div className={styles.saveButtonWrapper}>
              <Button 
                className={styles.saveButton}
                variant="solid" 
                color="blue" 
                size="large"
                loading={isSaving}
                disabled={isSaving}
                onClick={handleSaveAll}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { create } from 'zustand';
import { ShowroomZoneId, LightingMood, ProductConfigState } from '@/types/showroom';
import { PRODUCTS, SHOWROOM_ZONES } from '@/data/products';
import { ROOM_CONFIGURABLE_ITEMS } from '@/data/roomSurfaces';

export type ViewMode = 'interior' | 'isometric';

interface ShowroomState {
  activeZone: ShowroomZoneId;
  viewMode: ViewMode;
  selectedProductId: string | null;
  productCustomizations: Record<string, ProductConfigState>;
  
  // Architectural Room Configurator State (matching reference Image 4)
  roomSelections: Record<string, string>;
  activeConfigurableItemId: string | null; // e.g., 'carpet', 'wall-main'
  
  lightingMood: LightingMood;
  showHotspots: boolean;
  isWireframe: boolean;
  isInfoDrawerOpen: boolean;
  isConfiguratorOpen: boolean;
  quotationProductId: string | null;
  isQuotationModalOpen: boolean;
  cameraTriggerCount: number;
  zoomLevel: number; // For dedicated on-screen zoom control

  // Actions
  setActiveZone: (zone: ShowroomZoneId) => void;
  setViewMode: (mode: ViewMode) => void;
  selectProduct: (id: string | null) => void;
  focusProductById: (id: string) => void;
  updateCustomization: (
    productId: string,
    slot: 'upholsteryId' | 'finishId' | 'accentId',
    materialId: string
  ) => void;
  resetCustomization: (productId: string) => void;
  
  // Room customizer actions
  setRoomSelection: (itemId: string, optionId: string) => void;
  setActiveConfigurableItem: (itemId: string | null) => void;
  selectNextConfigurableItem: () => void;
  
  setLightingMood: (mood: LightingMood) => void;
  toggleHotspots: () => void;
  toggleWireframe: () => void;
  setInfoDrawerOpen: (open: boolean) => void;
  setConfiguratorOpen: (open: boolean) => void;
  openQuotationModal: (productId?: string) => void;
  closeQuotationModal: () => void;
  triggerCameraReset: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

// Initial defaults
const initialCustomizations: Record<string, ProductConfigState> = {};
PRODUCTS.forEach((p) => {
  initialCustomizations[p.id] = {
    upholsteryId: p.customizableParts.upholstery?.defaultId,
    finishId: p.customizableParts.finish?.defaultId,
    accentId: p.customizableParts.accent?.defaultId,
  };
});

const initialRoomSelections: Record<string, string> = {};
ROOM_CONFIGURABLE_ITEMS.forEach((item) => {
  initialRoomSelections[item.id] = item.defaultOptionId;
});

export const useShowroomStore = create<ShowroomState>((set, get) => ({
  activeZone: 'living',
  viewMode: 'interior',
  selectedProductId: null,
  productCustomizations: initialCustomizations,
  roomSelections: initialRoomSelections,
  activeConfigurableItemId: 'carpet', // default expanded like Image 4
  lightingMood: 'daylight',
  showHotspots: true,
  isWireframe: false,
  isInfoDrawerOpen: false,
  isConfiguratorOpen: true,
  quotationProductId: null,
  isQuotationModalOpen: false,
  cameraTriggerCount: 0,
  zoomLevel: 1,

  setActiveZone: (zone: ShowroomZoneId) => {
    set({
      activeZone: zone,
      viewMode: 'interior',
      selectedProductId: null,
      isInfoDrawerOpen: false,
      cameraTriggerCount: get().cameraTriggerCount + 1,
    });
  },

  setViewMode: (mode: ViewMode) => {
    set({
      viewMode: mode,
      selectedProductId: null,
      cameraTriggerCount: get().cameraTriggerCount + 1,
    });
  },

  selectProduct: (id: string | null) => {
    if (!id) {
      set({ selectedProductId: null, isInfoDrawerOpen: false });
      return;
    }
    const product = PRODUCTS.find((p) => p.id === id);
    if (product) {
      set({
        selectedProductId: id,
        activeZone: product.zone,
        isInfoDrawerOpen: true,
        cameraTriggerCount: get().cameraTriggerCount + 1,
      });
    }
  },

  focusProductById: (id: string) => {
    get().selectProduct(id);
  },

  updateCustomization: (productId, slot, materialId) => {
    set((state) => ({
      productCustomizations: {
        ...state.productCustomizations,
        [productId]: {
          ...state.productCustomizations[productId],
          [slot]: materialId,
        },
      },
    }));
  },

  resetCustomization: (productId) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    set((state) => ({
      productCustomizations: {
        ...state.productCustomizations,
        [productId]: {
          upholsteryId: product.customizableParts.upholstery?.defaultId,
          finishId: product.customizableParts.finish?.defaultId,
          accentId: product.customizableParts.accent?.defaultId,
        },
      },
    }));
  },

  setRoomSelection: (itemId, optionId) => {
    set((state) => ({
      roomSelections: {
        ...state.roomSelections,
        [itemId]: optionId,
      },
    }));
  },

  setActiveConfigurableItem: (itemId) => {
    set({ activeConfigurableItemId: itemId });
  },

  selectNextConfigurableItem: () => {
    const current = get().activeConfigurableItemId;
    const items = ROOM_CONFIGURABLE_ITEMS;
    const currentIndex = items.findIndex((i) => i.id === current);
    const nextIndex = (currentIndex + 1) % items.length;
    set({ activeConfigurableItemId: items[nextIndex].id });
  },

  setLightingMood: (mood) => set({ lightingMood: mood }),
  toggleHotspots: () => set((s) => ({ showHotspots: !s.showHotspots })),
  toggleWireframe: () => set((s) => ({ isWireframe: !s.isWireframe })),
  setInfoDrawerOpen: (open) => set({ isInfoDrawerOpen: open }),
  setConfiguratorOpen: (open) => set({ isConfiguratorOpen: open }),

  openQuotationModal: (productId) =>
    set({
      isQuotationModalOpen: true,
      quotationProductId: productId || get().selectedProductId || PRODUCTS[0].id,
    }),
  closeQuotationModal: () =>
    set({
      isQuotationModalOpen: false,
      quotationProductId: null,
    }),

  triggerCameraReset: () => {
    set((s) => ({
      selectedProductId: null,
      isInfoDrawerOpen: false,
      cameraTriggerCount: s.cameraTriggerCount + 1,
    }));
  },

  zoomIn: () => set((s) => ({ zoomLevel: Math.max(0.6, s.zoomLevel - 0.2), cameraTriggerCount: s.cameraTriggerCount + 1 })),
  zoomOut: () => set((s) => ({ zoomLevel: Math.min(2.0, s.zoomLevel + 0.2), cameraTriggerCount: s.cameraTriggerCount + 1 })),
}));

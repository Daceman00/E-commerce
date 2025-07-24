type ModalType = 'CreateProduct' | 'UpdateProduct' | 'DeleteProduct' | null

export interface ModalState {
    modalType: ModalType
}
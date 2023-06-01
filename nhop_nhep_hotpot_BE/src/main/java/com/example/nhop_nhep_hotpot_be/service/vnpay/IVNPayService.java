package com.example.nhop_nhep_hotpot_be.service.vnpay;

import com.example.nhop_nhep_hotpot_be.dto.payment.PaymentSendEmailDTO;

public interface IVNPayService {
    void sendEmail(PaymentSendEmailDTO paymentSendEmailDTO);
}

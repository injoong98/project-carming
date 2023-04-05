package com.carming.backend.order.controller;

import com.carming.backend.order.domain.request.DestinationDto;
import com.carming.backend.order.domain.request.RedisDTO;
import com.carming.backend.order.domain.response.IsArrival;
import com.carming.backend.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/orders")
@RestController
public class OrderController {

    private final OrderService orderService;

    @PostMapping("")
    public ResponseEntity<Void> save(@RequestBody RedisDTO request) {
        orderService.setValueByKey(request.getKey(), request.getValue());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<String> get(@RequestParam String key) {
        return ResponseEntity.ok(orderService.getValueByKey(key));
    }

    @PostMapping("/dest")
    public ResponseEntity<Void> saveDestination(@RequestBody DestinationDto request) {
        orderService.saveDestination(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/get-off")
    public ResponseEntity<Void> getOff() {
        orderService.getOff();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/valid-dest")
    public ResponseEntity<IsArrival> isDestination() {
        return ResponseEntity.ok(orderService.isDestination());
    }

    @GetMapping("/current-position")
    public ResponseEntity<DestinationDto> getCurrentPosition() {
        return ResponseEntity.ok(orderService.getCurrentPosition());
    }

    @GetMapping("/global-path")
    public ResponseEntity<String[]> getGlobalPath() {
        return ResponseEntity.ok(orderService.getGlobalPath());
    }
}

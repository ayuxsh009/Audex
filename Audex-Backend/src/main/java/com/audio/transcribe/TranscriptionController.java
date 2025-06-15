package com.audio.transcribe;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/transcribe")
public class TranscriptionController {
    
    @Value("${groq.api.key}")
    private String apiKey;
    
    @Value("${groq.api.url}")
    private String apiUrl;

    @PostMapping
    public ResponseEntity<String> transcribeAudio(
        @RequestParam("file") MultipartFile file,
        @RequestParam(value = "language", required = false, defaultValue = "en") String language) throws IOException {
            
        File tempFile = File.createTempFile("audio", getFileExtension(file.getOriginalFilename()));
        file.transferTo(tempFile);

        try {
            RestTemplate restTemplate = new RestTemplate();
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            headers.setBearerAuth(apiKey);
            
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", new FileSystemResource(tempFile));
            body.add("model", "whisper-large-v3");
            body.add("language", language);
            body.add("response_format", "json");
            
            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            
            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, requestEntity, String.class);
            
            return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
        } finally {
            tempFile.delete();
        }
    }

    private String getFileExtension(String filename) {
        if (filename == null) return ".tmp";
        int lastDot = filename.lastIndexOf('.');
        return lastDot > 0 ? filename.substring(lastDot) : ".tmp";
    }
}

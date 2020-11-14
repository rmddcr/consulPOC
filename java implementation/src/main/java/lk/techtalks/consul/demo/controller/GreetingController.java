package damitha.ranasinghe.consul.watch.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@RefreshScope
public class GreetingController {

    @Value("${my.property.retry_count}")
    private String retry_count;

    @GetMapping
    public String greet() {
        return "No of retry count is set to : " + retry_count;
    }

}

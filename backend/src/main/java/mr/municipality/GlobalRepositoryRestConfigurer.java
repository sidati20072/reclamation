package mr.municipality;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class GlobalRepositoryRestConfigurer extends RepositoryRestConfigurerAdapter {

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    super.configureRepositoryRestConfiguration(config);
    config.getCorsRegistry()
        .addMapping("/socket")
        .allowedOrigins("*")
        .allowedHeaders("*")
        .allowedMethods("*");
    //config.exposeIdsFor(User.class, Role.class);
  }
}

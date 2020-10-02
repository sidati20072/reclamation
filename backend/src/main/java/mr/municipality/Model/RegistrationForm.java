package mr.municipality.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistrationForm {

	private String username;
	private String email;
	private String password;
	private String nom;
	private String prenom;
	private String civilite;
	private String tel;
	private String role;
	private Long proId;

}

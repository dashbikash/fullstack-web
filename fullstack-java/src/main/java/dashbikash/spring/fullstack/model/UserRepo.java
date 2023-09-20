package dashbikash.spring.fullstack.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

@Component
public class UserRepo {
	@Autowired
	private MongoTemplate mongoTemplate;
	
	public User getUserbyUserName(String username) {
		Query query = new Query();
		query.addCriteria(Criteria.where("username").is(username));
		return mongoTemplate.findOne(query, User.class, "users");
	}
	public int insertUser(User user) {
		mongoTemplate.insert(user,"users");
		return 0;
	}
}

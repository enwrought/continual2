-- insert dummy user so that things work for testing --
INSERT INTO user (id, username, name, bio) VALUES ("DUMMY_ID", "i_am_a_dummy", "Dummy Bot", "");
INSERT INTO entry (id, isDraft, isPublic, title, text, authorId) VALUES ("DUMMY_ENTRY_ID", 1, 0, "Title", "hello!", "DUMMY_ID");

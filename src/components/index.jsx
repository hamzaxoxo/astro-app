 <div key={index} className="custom-shadow border hover:border hover:border-[#849FFF] rounded-lg p-4">
              <div className={`flex items-start  gap-4`}>
                <img src={user.avatar} alt={user.fullName} className="w-26 h-26 rounded-full mb-2" />
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold font-serif text-2xl">{user.fullName}</h2>
                  <p className="text-gray-500">{user.city}, {user.country}</p>
                  <div className="flex flex-wrap mt-2">
                    {user.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[#849FFF] font-medium border border-[#849FFF] rounded-full px-2 py-1 mr-2 mb-2 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                {user.socialLinks && (
                  <div className="flex gap-4 mt-2">
                    {Object.entries(user.socialLinks).map(([platform, link]) =>
                      link ? (
                          <a
                            key={platform}
                            href={`https://${link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#849FFF] hover:underline"
                          >
                            <FaFacebook size={20} />
                          </a>
                      ) : null
                    )}
                  </div>
                )}
              </div>
            </div>
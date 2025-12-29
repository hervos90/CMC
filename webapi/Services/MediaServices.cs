using webapi.EF;
using webapi.Models.ViewsModels;
using webapi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace webapi.Services
{
    public class MediaServices : IMediaServices
    {
        private readonly CMCContext _context;
        IConfiguration _configurationManager;
        public MediaServices(CMCContext context)
        {
            _context = context;
        }

        public List<MediaViewModel>? GetMedias()
        {
            return _context.Medias.Include(s => s.Orateur)
                                   .Include(s => s.LangueOriginaleId)
                                   .Include(s => s.TypeMediaId)
                                   .Include(s => s.ActeurMedias).Select(s => new MediaViewModel
                                   {
                                       Id = s.Id,
                                       LangueOriginaleId = s.Langue.LangueId,
                                       LangueOriginaleNom = s.Langue.Libelle,
                                       TypeMediaId = s.TypeMediaId,
                                       Titre = s.Titre,
                                       Description = s.Description,

                                       LinkMedia = s.LinkMedia,
                                       OrateurId = s.Orateur.OrateurId,
                                       NomOrateur = s.Orateur.Personne.Nom,


                                   }).ToList();
        }

        public MediaViewModel GetMediaById(int id)
        {
            var media =  _context.Medias.Where(s => s.Id == id).Include(s => s.Orateur)
                                   .Include(s => s.LangueOriginaleId)
                                   .Include(s => s.TypeMediaId)
                                   .Include(s => s.ActeurMedias).Select(s => new MediaViewModel
                                   {
                                       Id = s.Id,
                                       LangueOriginaleId = s.Langue.LangueId,
                                       LangueOriginaleNom = s.Langue.Libelle,
                                       TypeMediaId = s.TypeMediaId,
                                       Titre = s.Titre,
                                       Description = s.Description,

                                       LinkMedia = s.LinkMedia,
                                       OrateurId = s.Orateur.OrateurId,
                                       NomOrateur = s.Orateur.Personne.Nom,


                                   }).FirstOrDefault();
            if (media != null) return media;
            return new MediaViewModel();

        }

        public bool CreateMedia(MediaViewModel media)
        {
            try
            {
                var filePath = string.Empty;
                //chargement du fichier
                if (media.Fichier.Length != null)
                {
                    filePath = Path.Combine(_configurationManager["LinkFileUpdload"],
                        Path.GetRandomFileName());

                    using (var stream = System.IO.File.Create(filePath))
                    {
                        media.Fichier.CopyToAsync(stream);
                    }
                }


                if (media.ListActeurs != null && media.ListActeurs.Count == 0)
                {
                    Media itemMedia = new Media()
                    {
                        Titre = media.Titre,
                        Description = media.Description,
                        LinkMedia = filePath,
                        DatePublication = media.DatePublication,
                        OrateurId = media.OrateurId,
                        LangueOriginaleId = media.LangueOriginaleId,
                        TypeMediaId = media.TypeMediaId

                    };

                    _context.Medias.Add(itemMedia);
                    _context.SaveChanges();

                }
                else
                {
                    using var transaction = _context.Database.BeginTransaction();

                    Media itemMedia = new Media()
                    {
                        Titre = media.Titre,
                        Description = media.Description,
                        LinkMedia = media.LinkMedia,
                        DatePublication = media.DatePublication,
                        OrateurId = media.OrateurId,
                        LangueOriginaleId = media.LangueOriginaleId,
                        TypeMediaId = media.TypeMediaId

                    };

                    _context.Medias.Add(itemMedia);
                    _context.SaveChanges();

                    for (int i = 0; i < media.ListActeurs.Count; i++)
                    {
                        ActeurMedia itemActeurMedia = new ActeurMedia()
                        {
                            ActeurId = media.ListActeurs[i].ActeurId,
                            MediaId = media.Id,
                            Biographie = media.ListActeurs[i].Biographie
                        };
                        _context.ActeurMedias.Add(itemActeurMedia);
                        _context.SaveChanges();
                    }
                    transaction.Commit();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }

        public bool UpdateMedia(int id, MediaViewModel media)
        {
            try
            {
                if (media.ListActeurs != null && media.ListActeurs.Count == 0)
                {
                    Media itemMedia = new Media()
                    {
                        Id= id,
                        Titre = media.Titre,
                        Description = media.Description,
                        CategorieId = media.CategorieId,
                        LinkMedia = media.LinkMedia,
                        DatePublication = media.DatePublication,
                        OrateurId = media.OrateurId,
                        LangueOriginaleId = media.LangueOriginaleId,
                        TypeMediaId = media.TypeMediaId

                    };
                    _context.SaveChanges();

                }
                else
                {
                    using var transaction = _context.Database.BeginTransaction();

                    Media itemMedia = new Media()
                    {
                        Id= id,
                        Titre = media.Titre,
                        Description = media.Description,
                        LinkMedia = media.LinkMedia,
                        DatePublication = media.DatePublication,
                        LangueOriginaleId = media.LangueOriginaleId,
                        TypeMediaId = media.TypeMediaId,
                        CategorieId = media.CategorieId

                    };

                    _context.SaveChanges();

                    for (int i = 0; i < media.ListActeurs.Count; i++)
                    {
                        ActeurMedia itemActeurMedia = new ActeurMedia()
                        {
                            ActeurId = media.ListActeurs[i].ActeurId,
                            MediaId = media.Id,
                            Biographie = media.ListActeurs[i].Biographie
                        };
                        _context.SaveChanges();
                    }
                    transaction.Commit();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }

        public bool DeleteMedia(int MediaId)
        {
            try
            {
                List<int> listActeurId = ListActeurIdMediaService(MediaId);
                if (listActeurId != null && listActeurId.Count == 0)
                {
                    if (GetMediaById(MediaId) != null)
                    {
                        Media itemMedia = new Media()
                        {
                            Id = MediaId
                        };
                        _context.Remove(itemMedia);
                    }
                }
                else
                {
                    using var transaction = _context.Database.BeginTransaction();

                    if (GetMediaById(MediaId) != null)
                    {
                        Media itemMedia = new Media()
                        {
                            Id = MediaId
                        };
                        _context.Remove(itemMedia);
                    }

                    for (int i = 0; i < listActeurId.Count; i++)
                    {
                        if (GetActeurMediaById(listActeurId[i]) != null)
                        {
                            ActeurMedia itemActeurMedia = new ActeurMedia()
                            {
                                ActeurId = listActeurId[i]
                            };
                            _context.Remove(itemActeurMedia);
                        }
                    }
                    transaction.Commit();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
         
        }


        public List<ActeurMedia> GetActeurMediaById(int id)
        {
            var ListActeurMedia = _context.ActeurMedias.Where(s=>s.ActeurId == id).ToList();
            if (ListActeurMedia != null) return ListActeurMedia;
            return new List<ActeurMedia>();
        }

        public List<int> ListActeurIdMediaService (int id)
        {
            var listActeurs = _context.ActeurMedias.Where(s => s.MediaId == id).Select(s => s.ActeurId).ToList();
          if(listActeurs != null)  return listActeurs;
          return new List<int>();
        }

    }
}
